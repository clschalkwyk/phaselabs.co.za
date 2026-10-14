import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execFileSync } from 'node:child_process';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_BUILD_HASH': JSON.stringify(execFileSync('git', ['rev-parse', '--short=7', 'HEAD'], { cwd: import.meta.dirname, encoding: 'utf8' }).trim()),
  },
});
