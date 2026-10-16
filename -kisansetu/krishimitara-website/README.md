# Krishimitara — website starter

A responsive, static landing website for the Krishimitara agriculture ecosystem concept. Built with plain HTML, CSS and JavaScript so it can be hosted for free on GitHub Pages or Cloudflare Pages.

## Included sections
- Responsive home page and mobile navigation
- Six audience groups: farmers, agricultural labs, transport providers, government/institutions, agriculture companies, sponsors/NGOs
- Offline-aware and regional-language product principles
- Phased roadmap based on the KisanSetu pitch deck
- Partner enquiry form (mailto-based; no database or backend)

## Before publishing
1. Open `script.js`.
2. Replace `YOUR_EMAIL@example.com` with your official contact email.
3. Review the wording and roadmap; the service areas are proposed, not live services.
4. Do not add claims, government affiliation, partner logos, customer numbers or live services unless verified.
5. Test on mobile and desktop.

## Publish free with GitHub Pages
1. Create or sign in to a GitHub account.
2. Create a new **public** repository, for example `krishimitara-website`.
3. Upload `index.html`, `styles.css`, `script.js`, and `README.md` to the repository root.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/(root)`, then save.
7. Wait for the Pages URL to appear in Settings → Pages.

## Alternative: Cloudflare Pages
1. Push these files to a GitHub repository.
2. In Cloudflare Dashboard, open **Workers & Pages** and create a Pages project connected to the repository.
3. For a plain static site, use no build command and set the output directory to `/` (or the repository root as accepted by the current setup flow).
4. Deploy and use the provided `pages.dev` address.

## Important limitations
- This is a front-end website, not a complete marketplace or portal backend.
- Enquiry submissions are not stored. The form prepares an email using the visitor's email app after you configure `CONTACT_EMAIL`.
- There is no login, admin dashboard, database, verified listings, payments, AI diagnosis or government API integration.
- Google Fonts are loaded from the web; the page otherwise works as a static site.
- HTTPS is provided by GitHub Pages / Cloudflare Pages on their hosted URL.
