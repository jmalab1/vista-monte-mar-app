import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isWsl = Boolean(process.env.WSL_DISTRO_NAME);
  const isMountedWindowsPath = process.cwd().startsWith('/mnt/');
  const usePolling =
    process.env.VITE_USE_POLLING === '1' || (isWsl && isMountedWindowsPath);
  const hmrHost = process.env.VITE_HMR_HOST || 'localhost';
  const hmrClientPort = Number(process.env.VITE_HMR_CLIENT_PORT || 5173);
  const apiProxyTarget =
    process.env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:8135';

  return {
    // Keep dev base at "/" for stable HMR; only use subpath base in production build.
    base: command === 'build' && mode === 'server' ? '/vista_monte_mar/' : '/',
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
      host: '0.0.0.0',
      strictPort: true,
      port: 5173,
      watch: usePolling
        ? {
            usePolling: true,
            interval: 150,
          }
        : undefined,
      hmr: {
        host: hmrHost,
        clientPort: hmrClientPort,
      },
      proxy: {
        // Frontend /api/* requests are proxied to the backend.
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
