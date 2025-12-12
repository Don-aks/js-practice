import { fileURLToPath } from 'node:url';
import { vitePluginWebp } from 'vite-plugin-to-webp';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default {
  base: '',
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  plugins: [
    vitePluginWebp({ cwd: ['src/assets'] }),
    ViteImageOptimizer({
      include: ['src/assets/**/*.webp'],
      webp: {
        effort: 6,
        quality: 80,
        lossless: true,
        alphaQuality: 80,
        nearLossless: true,
      },
    }),
  ],
};
