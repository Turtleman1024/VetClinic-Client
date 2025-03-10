import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
        return {
                server: {
                        open: true,
                        host: 'localhost',
                        port: 3000
                },
                // This changes the out put dir from dist to build
                // comment this out if that isn't relevant for your project
                build: {
                        outDir: 'build',
                },
                plugins: [
                        reactRefresh(),
                        svgrPlugin(),
                ],
        };
})