# Safe Riding Bali — Astro website

A standalone migration of https://oliverselch.wixsite.com/website, captured on 8 November 2026. The five public navigation pages, all 75 text blocks, original branding, 27 images, custom DM Sans fonts, six-photo gallery, two testimonials, two YouTube aftermovies, tour hero video and medical-facilities map are retained. The Wix advertising banner and Wix runtime are removed.

## Open in VS Code and run

1. Extract this ZIP and open the **bali-safe-riding** folder in VS Code.
2. Install **Node.js 24 LTS** if it is not already installed. The current Astro dependency requires Node 22.23.4 or newer.
3. In VS Code choose **Terminal → New Terminal**, then run:

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal. Press Ctrl+C to stop the server.

```sh
npm run check     # build and verify original content, links and assets
npm run preview   # serve the production HTML build locally
```

The `dist/` directory included in this download is ready-built HTML, CSS, JavaScript and local media. It needs an HTTP server; use `npm run preview` rather than double-clicking HTML files.

## Publish on GitHub Pages

1. Create a GitHub repository, for example **bali-safe-riding**.
2. Add the files **inside this project folder** to the repository root. `package.json`, `astro.config.mjs`, `src/`, `public/`, and `.github/workflows/deploy.yml` must be at the root, rather than inside another nested folder. The `.github` folder may be hidden in your file manager; include it. VS Code's Source Control interface or Git can upload all tracked files.
3. Push to a branch named **main**.
4. On GitHub, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
5. Open **Actions → Deploy Astro to GitHub Pages**. If the initial run preceded enabling Pages, rerun it. The deploy job provides your website's URL when successful.

Every push to `main` then rebuilds, checks and deploys the site automatically. The workflow uses Node 24. Repository websites automatically use `/<repository-name>/` as their base path; repositories named `<username>.github.io` use `/`.

For a custom domain, set `SITE_URL` to your domain and `BASE_PATH` to `/` in the workflow build and verification environment, then configure the domain in GitHub Pages. For a manual repository-path build:

```sh
# macOS / Linux
BASE_PATH=/bali-safe-riding/ npm run build
BASE_PATH=/bali-safe-riding/ npm run verify
```

```powershell
# Windows PowerShell
$env:BASE_PATH = '/bali-safe-riding/'
npm run build
npm run verify
Remove-Item Env:BASE_PATH
```

No repository has been created and no public deployment has been made by this delivery.

## Edit the website

| What to edit | File |
| --- | --- |
| Homepage layout | `src/pages/index.astro` |
| Scooter training | `src/pages/trainingcourse.astro` |
| Tours, gallery, reviews, aftermovies | `src/pages/scootertours.astro` |
| Emergency regions, contacts and form | `src/pages/emergency.astro` |
| About / original story | `src/pages/ourstory.astro` |
| Shared header, navigation and footer | `src/layouts/Layout.astro` |
| Colors, spacing, type and mobile layouts | `src/styles/global.css` |
| Original editable text and source references | `src/data/content.json` |
| Images, fonts and local video | `public/assets/` |
| Asset dimensions | `src/data/image-dimensions.json` |

Most original body text is rendered with `<Rich page="home" index={3}/>` and similar components. Find that page and array position in `content.json`, then edit its **`html`** field. The **`text`** field is the original comparison baseline used by the migration check; update it too when intentionally changing copy. Main page headings and button labels are directly in each `.astro` file.

The image component uses the original file reference in `content.json` to select a local `.webp`. Replacing the corresponding file in `public/assets` changes the image. If its aspect ratio changes, update `image-dimensions.json` too. `ASSETS.md` identifies every image.

The global design colors are at the top of `global.css`: `--orange`, `--blue`, `--red` and `--ink`. Add new pages under `src/pages` and wrap them in the shared `Layout` component; add a corresponding navigation entry in `Layout.astro`.

## Static-site behavior

- Training booking buttons retain the original WhatsApp destination.
- Tour buttons retain the original Nomeo destinations. These are external services; their availability and booking details are outside this static website.
- The gallery opens accessible native dialogs; Escape and the close button dismiss them.
- Both original testimonial slides are available using Previous / Next.
- Emergency regions support clicking and keyboard navigation; call buttons match the adjacent displayed numbers.
- The corrections form validates the required fields and **prepares an email** to `team@saferidingbali.com`. The visitor must finish sending in their email app. It does not store submissions or send email automatically. Direct email remains available in the footer.
- Images, fonts and the tour hero video are local. YouTube and Google Maps still need internet access.

## Migration notes and verification limits

All 75 original text blocks are retained, including original wording and spelling. The original emergency disclaimer remains. Emergency contacts and medical guidance are reproduced as source content, **not independently verified medical information**. Have a qualified local professional review those details before relying on or launching the emergency resource.

Several Wix call targets did not match their visible phone labels. This migration makes each call target match the original displayed label. Examples: the RS Aricanti label showed `+62361974573` but its call link used `+62361674573`; three Denpasar call links led to numbers displayed under Gianyar. These corrections fix link consistency and do not verify the underlying phone numbers. The original repeated Payangan / Premagana number is retained for review.

The original large empty areas and partially loaded media have been replaced with complete content sections. Original orange branding, white panels, blue accents, rounded buttons, section order and photography are preserved, with responsive layouts and a mobile menu.

The production build and automated checks pass for both root hosting and a GitHub repository path. Browser comparison of the rebuilt site could not be completed because this session's preview relay was unavailable. Inspect desktop and mobile views with `npm run dev` before public release. External WhatsApp / Nomeo transactions, email delivery, and the real-world validity of emergency contacts have not been tested.
