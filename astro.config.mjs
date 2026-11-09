import { defineConfig } from 'astro/config';
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const owner = process.env.GITHUB_REPOSITORY?.split('/')[0];
export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'https://www.saferidingbali.com'),
  base: process.env.BASE_PATH || (repository && !repository.endsWith('.github.io') ? `/${repository}` : '/'),
  trailingSlash: 'always',
  build: { format: 'directory' },
});
