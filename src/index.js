// Lamaan website Worker: serves the site from ./public and sends booking alerts to WhatsApp.
// Setup (Cloudflare dashboard → Workers → throbbing-pond-b970 → Settings → Variables and Secrets):
//   CALLMEBOT_KEY  (Secret) – the API key CallMeBot sends you on WhatsApp
// OWNER_PHONE is set in wrangler.jsonc.

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/book") {
      if (request.method !== "POST") return json({ ok: false }, 405);

      let text = "";
      try {
        const body = await request.json();
        text = String(body.text || "").trim().slice(0, 1500);
      } catch (e) {}
      if (!text) return json({ ok: false, error: "empty" }, 400);
      if (!env.CALLMEBOT_KEY || !env.OWNER_PHONE) return json({ ok: false, error: "not configured" }, 503);

      const api =
        "https://api.callmebot.com/whatsapp.php?phone=" + encodeURIComponent(env.OWNER_PHONE) +
        "&text=" + encodeURIComponent("New website booking\n\n" + text) +
        "&apikey=" + encodeURIComponent(env.CALLMEBOT_KEY);
      try {
        const r = await fetch(api);
        const out = await r.text();
        const ok = r.ok && !/(error|invalid)/i.test(out);
        return json({ ok }, ok ? 200 : 502);
      } catch (e) {
        return json({ ok: false }, 502);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
