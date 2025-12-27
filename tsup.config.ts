import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  tsconfig: 'tsconfig.build.json',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
