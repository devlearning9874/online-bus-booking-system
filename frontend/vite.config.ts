import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    port: 5173, // Updated to your targeted port
    open: true, // Automatically opens the browser on server startup
    proxy: {
      // Unifies proxy rules: Any path starting with /api or /bookings 
      // will be caught and forwarded directly to your API Gateway
      '/api': {
        target: 'http://localhost:3500', // Targets your API Gateway port
        changeOrigin: true,
      },
      '/bookings': {
        target: 'http://localhost:3500', // Targets your API Gateway port
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'ui-vendor': ['@mui/material', '@emotion/react'], // Keeps your bundle size small and responsive
        },
      },
    },
  },
})