# lamaan-website

Website for lamaanalkhaleej.com. Every change committed to the `main` branch is deployed to Cloudflare automatically (Worker: throbbing-pond-b970).

## Where things go

- `public/` – everything in this folder is the live website
  - `public/index.html` – home page
  - `public/services.html` – services page
  - `public/photos` – photos used by the site
- `wrangler.jsonc` – Cloudflare settings (no need to change)

## Adding or replacing images

1. Open the `public/images` folder on GitHub (create it with **Add file → Upload files** if it doesn't exist yet).
2. Click **Add file → Upload files** and drag in your photos.
3. Use the exact names the site expects: hood.jpg, full.jpg, duct.jpg, fan.jpg, deep.jpg, contract.jpg, work1.jpg … work8.jpg.
4. Click **Commit changes**. The site updates within a minute or two.
