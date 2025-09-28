# Game Sweat — Live Bet Tracker (Beginner Friendly)

This is a one-page website that tracks your bets with progress bars.
You can **run it manually** (type numbers yourself) or **auto-update** via a free MySportsFeeds key.

---

## Part A — Quick manual tracker (no accounts)
1) Download this folder and open **index.html** in your browser.
2) Type the live numbers (yards, receptions) — bars update automatically.
3) Tick the TD checkboxes.
4) Share the file (or host it using GitHub Pages/Netlify).

---

## Part B — Add live auto-refresh (free MySportsFeeds key)
**Goal:** keep your API key secret and have the page call MSF through a tiny proxy.

### Step 1 — Create a free MSF key
- Sign up at MySportsFeeds and copy your **API key**.

### Step 2 — Deploy this project to Vercel
- Go to https://vercel.com → New Project → "Import" this folder (or a GitHub repo containing it).
- After importing, go to **Project → Settings → Environment Variables** and add:
  - Key: `MSF_API_KEY`
  - Value: *your MySportsFeeds API key*
  - Scope: Production + Preview

### Step 3 — Confirm the proxy works
- Visit: `/api/msf?path=v2.0/pull/nfl/2025-regular/week/4/games.json` on your Vercel URL.
- You should see JSON listing Week 4 games.
  - If not, re-check the env var and redeploy.

### Step 4 — Find today’s 2 game IDs
- Open your site (index.html) on Vercel.
- Click **“Load Week 4 list”** (top card). If the proxy is working, you’ll see JSON.
- Look for the KC@BAL and GB@DAL entries and copy their **game IDs**.
- Paste them into the two input boxes and click **Save**.

### Step 5 — Turn on auto-refresh
- In **index.html**, near the very bottom, find this line:
  ```js
  // setInterval(refresh, 30000);
  ```
- Remove the `//` so it becomes:
  ```js
  setInterval(refresh, 30000);
  ```
- **Important:** Confirm your **box score feed path** (BOX_FEED_PATH) in your MSF portal.
  - The default in this file is:
    ```js
    const BOX_FEED_PATH = 'v2.0/pull/nfl/2025-regular/game_boxscore.json';
    ```
  - If your portal shows a different path (e.g., `.../games/{gameId}/boxscore.json`), update `BOX_FEED_PATH`
    and the `getGameBox()` function accordingly.

### Step 6 — Verify numbers move
- Open DevTools → Console to watch for errors.
- Every ~30s, the page calls your proxy → MSF → returns box score JSON → updates each player’s input value → bars move.

**You can always fall back to manual typing** if the feed path differs — your site will still work for today.

---

## Optional — Host without Vercel (manual only)
- GitHub Pages or Netlify Drop can host **index.html** for free.
- Auto-refresh needs the Vercel proxy (or your own server) so your API key stays secret.

Good luck and have a great sweat!