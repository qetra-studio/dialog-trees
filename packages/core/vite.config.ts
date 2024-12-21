import {defineConfig} from "vite";
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [react(), dts({
        insertTypesEntry: true
    })],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'QetraDreesMui',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                preserveModules: true,
                preserveModulesRoot: 'src', // Set the root for the output directory
                dir: 'dist',
                entryFileNames: '[name].js', // Entry file names
            },
        },
        target: 'modules',
        emptyOutDir: true,
        minify: false
    },
});
