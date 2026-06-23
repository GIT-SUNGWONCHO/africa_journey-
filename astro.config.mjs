import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // TODO: 배포 도메인으로 교체
  trailingSlash: 'ignore',
});
