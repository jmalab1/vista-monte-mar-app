import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'server' ? '/vista_monte_mar/' : '/',
    plugins: [react(), imagetools()],
    define: { 'process.env': {} },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split vendor dependencies into separate chunks
            if (id.includes('node_modules')) {
              return id.split('node_modules/')[1].split('/')[0]; // Creates a chunk for each module
            }
          },
        },
      },
      minify: 'terser', // You can specify 'esbuild' or 'terser'
      terserOptions: {
        compress: {
          drop_console: true, // Remove console logs in production
        },
        mangle: true, // Enable variable name mangling
      },
    },
    server: {
      proxy: {
        // When the frontend requests /api/*, it will be proxied to the backend at http://localhost:4000.
        '/api': {
          target: 'https://localhost', // Backend server
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
