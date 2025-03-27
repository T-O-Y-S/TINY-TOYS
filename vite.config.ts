import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // Use an array for multiple allowed hosts
    allowedHosts: [
      'ef76-240b-c010-4d6-75f5-9ee2-5e6a-c4a-4ce9.ngrok-free.app',
      'localhost',
    ],
    // Add CORS headers for development
    cors: true,
    // Improve hot module replacement performance
    hmr: {
      overlay: true,
    },
  },
  plugins: [react()],
  // Add optimizations for production builds
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
});
