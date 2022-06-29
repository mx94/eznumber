import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'

const env = JSON.stringify(process.env.NODE_ENV || 'development')
const extensions = ['.js', '.ts']

export default {
  input: './src/index.ts',
  output: {
    file: './dist/eznumber.esm.js',
    name: 'eznumber',
    format: 'es',
    minify: true,
    sourcemap: false,
  },
  plugins: [
    resolve({
      extensions,
      modulesOnly: true,
    }),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
    replace({
      'process.env.NODE_ENV': env,
    }),
    terser(),
    visualizer({
      filename: './statistics.html',
      title: 'My Bundle',
      sourcemap: true,
    }),
  ],
}
