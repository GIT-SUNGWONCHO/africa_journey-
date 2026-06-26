import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://africa-journey.vercel.app',
  trailingSlash: 'ignore',
  vite: {
    // dev 서버가 staging/임시 폴더를 감시하다 EBUSY 에러 내는 것 방지
    server: { watch: { ignored: ['**/materials/**', '**/.tmp/**'] } },
  },
});
