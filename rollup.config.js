import typescript from 'rollup-plugin-typescript2';
import externals from 'rollup-plugin-node-externals';

const formats = [
  {
    file: 'dist/index.js',
    format: 'cjs',
  },
  {
    file: 'dist/index.mjs',
    format: 'es',
  },
];

export default formats.map((output) => ({
  input: 'src/index.ts',
  output,
  plugins: [
    typescript(),
    externals(),
  ],
}));
