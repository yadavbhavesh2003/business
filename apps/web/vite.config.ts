import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Exposes on 0.0.0.0 so Android devices on Wi-Fi can test at http://<LAN_IP>:5173
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@udyamos/core': path.resolve(__dirname, '../../packages/core/src/index.ts'),
      '@udyamos/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
      '@udyamos/database': path.resolve(__dirname, '../../packages/database/src/index.ts'),
      '@udyamos/mobile': path.resolve(__dirname, '../../apps/mobile/src/index.ts')
    }
  }
});
