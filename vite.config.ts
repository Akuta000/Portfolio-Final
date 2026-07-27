import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      middlewareMode: false,
      hmr: {
        protocol: 'wss',
        host: '3000-ipfoq5zqodunobtnv3j31-1b253b9d.sg1.manus.computer',
        port: 443,
      },
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
