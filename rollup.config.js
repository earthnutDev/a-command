import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';

const excludedPkg = ['node:', 'a-', 'color-pen', '@qqi'];

/** 生成  npm 文件的打包配置文件 */
export default {
  input: './index.ts',
  output: [
    {
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/mjs',
    },
  ],
  // 配置需要排除的包
  external: id => new RegExp('^'.concat(excludedPkg.join('|^'))).test(id),
  plugins: [
    resolve(),
    commonjs(),
    // 可打包 json 内容
    json(),
    typescript({}),
    // 去除无用代码
    cleanup(),
    copy({
      targets: [
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
      ],
    }),
  ],
};
