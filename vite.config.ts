import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/extension.ts'),
      formats: ['cjs'],
      fileName: 'extension'
    },
    rollupOptions: {
      external: ['vscode'],
      output: {
        entryFileNames: '[name].js'
      }
    },
    outDir: 'dist',
    sourcemap: true,
    minify: false,
    target: 'node18'
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
});
