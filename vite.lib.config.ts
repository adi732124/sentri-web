import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/lib-entry.ts', 'src/components/**/*.{ts,tsx}', 'src/types/**/*.ts'],
      exclude: ['src/**/*.stories.*', 'src/**/*.test.*', 'src/**/*.spec.*'],
      rollupTypes: true,
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib-entry.ts'),
      name: 'SentriUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'recharts', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsx',
          recharts: 'Recharts',
          'lucide-react': 'LucideReact',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
