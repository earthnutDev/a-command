import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';

import { readFileToJsonSync } from 'a-node-tools';
import { pen } from 'color-pen';

/** 配置需要不打包进生产包的包名配置  */
const excludedPkg = ['node:', 'a-', 'color-pen', '@qqi'];

const excludedRegExp = new RegExp('^'.concat(excludedPkg.join('|^')));
/**  读取当前文件  */
const packInfo = readFileToJsonSync('./package.json');
/**  已配置的依赖  */
const dependencies = Object.keys({
  ...(packInfo.dependencies || {}),
  ...(packInfo.preDependencies || {}),
});

/**
 *
 * 依赖配置
 *
 */
function external(id) {
  excludedRegExp.lastIndex = 0;
  const result = excludedRegExp.test(id);
  /// 保证排除的包纯在于
  if (result === true) {
    if (
      dependencies.includes(id) === false &&
      // 忽略 node: 开头的包
      !id.toString().startsWith('node:')
    ) {
      throw new RangeError(
        `${pen.bgRed.blink.bold.yellow(id)} 依赖被排除打包却未再 package.json 中配置`,
      );
    }
  } else {
    if (/^[^./]/g.test(id)) {
      throw new RangeError(
        `${pen.bgRed.blink.bold.yellow(id)} 依赖未被排除，打包关闭`,
      );
    }
  }
  return result;
}

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
    {
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/cjs',
    },
  ],
  // 配置需要排除的包
  external,
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
