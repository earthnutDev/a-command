import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const temporaryArr = ['node:', 'a-', 'color-pen'];

/** 生成  npm 文件的打包配置文件 */
export default {
  input: './ex/index.ts',
  output: [
    {
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: '.test/',
    },
  ],
  // 配置需要排除的包
  external: id => new RegExp('^'.concat(temporaryArr.join('|^'))).test(id),
  plugins: [
    resolve(),
    commonjs(),
    // 可打包 json 内容
    json(),
    typescript({}),
  ],
};
