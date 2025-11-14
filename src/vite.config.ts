import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  optimizeDeps: {
    exclude: ['primeng', 'primeicons'],
  },
  ssr: {
    noExternal: ['primeng', 'primeicons'], // prevent DOM eval in SSR
  },
});
