import {defineConfig} from "vite";
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), dts({
        insertTypesEntry: true
    }), tsConfigPaths()],
    build: {
        lib: {
            entry: {
                index: "src/index.ts",
                "contexts/index": "src/contexts/index.ts",
                "dialog/index": "src/dialog/index.ts"
            },
            name: 'QetraDreesMui',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime',
                /^@mui/,
                /^@emotion/],
            output: {
                preserveModules: true,
                hoistTransitiveImports: true,
                preserveModulesRoot: 'src', // Set the root for the output directory
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
    assetsInclude: ['package.json'],
});
