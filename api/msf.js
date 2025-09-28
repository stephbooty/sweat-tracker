// /api/msf — Vercel serverless proxy for MySportsFeeds
export default async function handler(req, res) {
  try {
    const { path = "", q = "" } = req.query;
    if (!path) return res.status(400).json({ error: "Missing ?path=" });
    const apiKey = process.env.MSF_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Server missing MSF_API_KEY" });

    const auth = Buffer.from(`${apiKey}:MYSPORTSFEEDS`).toString("base64");
    const url = `https://api.mysportsfeeds.com/${path}${q ? `?${q}` : ""}`;

    const r = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
    const text = await r.text();
    res.setHeader("content-type", r.headers.get("content-type") || "application/json");
    res.status(r.status).send(text);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}