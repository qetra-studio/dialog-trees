import {defineConfig} from "vite";
import react from '@vitejs/plugin-react';
import dts from "vite-plugin-dts";
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), dts({
        insertTypesEntry: true
    }), tsConfigPaths()],
    build: {
        lib: {
            entry: ['src/index.ts',
                'src/dialog/index.ts',
                'src/contexts/index.ts',
                'src/base/index.ts'],
            name: 'QetraDreesMui',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime',
                /^@mui/,
                /^@emotion/],
            output: {
                preserveModules: true,
                hoistTransitiveImports: true,
                preserveModulesRoot: 'src', // Set the root for the output directory
                entryFileNames: '[name].js', // Entry file names
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        target: 'modules',
        emptyOutDir: true,
        minify: false,
    },
});
