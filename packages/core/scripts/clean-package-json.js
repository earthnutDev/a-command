import {
  pathJoin,
  readFileToJsonSync,
  getDirectoryBy,
  writeJsonFileSync,
  fileExist,
} from 'a-node-tools';
import { readdirSync, writeFileSync } from 'node:fs';
import { basename, extname } from 'node:path';

// 原始 package.json 内容
let packageJson = readFileToJsonSync('./package.json');
const dependencies = packageJson.dependencies;
// 移除冗余的键
[
  'scripts',
  'devDependencies',
  'lint-staged',
  'private',
  'dependencies',
].forEach(key => delete packageJson[key]);

const esPrefix = 'es'; // es 前缀
const cjsPrefix = 'cjs'; // cjs 前缀
const dtsPrefix = 'es/src'; // 类型文件的前缀
// 查看当前打包 dist 文件路径
const distParentPath = getDirectoryBy('dist', 'directory');
// <--  !!! -->
// <--  !!! -->
// <--  !!! -->
// 查看当前的源码文件路径（原则上与上面值一致）
const srcParentDirectory = getDirectoryBy('src', 'directory');
// 当前 src 的路径
const srcDirectory = pathJoin(srcParentDirectory, 'src');
// src 目录下的文件列表
const srcChildrenList = readdirSync(srcDirectory);
// 打包的 exports
const exportsList = {};

for (const childrenName of srcChildrenList) {
  // 如果是测试文件则跳过
  if (
    // 剔除测试文件
    childrenName.endsWith('.test.ts') ||
    // 剔除单独配置的根文件
    childrenName.endsWith('index.ts') ||
    childrenName.endsWith('utils') ||
    // 剔除非导出模块
    ['testData.ts', 'types.ts'].includes(childrenName)
  )
    continue;
  // 文件名（不带后缀）
  const childrenBaseName = basename(childrenName, extname(childrenName));
  // 子文件/夹的路径
  const childPath = pathJoin(srcDirectory, childrenName);

  const childFile = fileExist(childPath); // 文件元数据
  if (!childFile) throw new RangeError(`${childrenName} 文件未能读取`);
  // 子文件是文件夹时以 index.xxx.js 为准
  if (childFile.isDirectory()) {
    exportsList[`./${childrenBaseName}`] = {
      default: `./${esPrefix}/${childrenName}/index.js`,
      import: `./${esPrefix}/${childrenName}/index.js`,
      require: `./${cjsPrefix}/${childrenName}/index.js`,
      types: `./${dtsPrefix}/${childrenName}/index.d.ts`,
    };
  } else if (childFile.isFile()) {
    exportsList[`./${childrenBaseName}`] = {
      default: `./${esPrefix}/${childrenBaseName}.js`,
      import: `./${esPrefix}/${childrenBaseName}.js`,
      require: `./${cjsPrefix}/${childrenBaseName}.js`,
      types: `./${dtsPrefix}/${childrenBaseName}.d.ts`,
    };
  } else {
    throw new RangeError(`${childrenName} 文件类型不符合要求`);
  }
}
packageJson = {
  ...packageJson,
  main: cjsPrefix + '/index.js', // 旧版本 CommonJs 入口
  module: esPrefix + '/index.js', // 旧版本 ESM 入口
  types: dtsPrefix + '/index.d.ts', // 旧版本类型入口
  author: {
    name: '泥豆君',
    email: 'Mr.MudBean@outlook.com',
    url: 'https://earthnut.dev',
  },
  description:
    '简约终端交互。包含：启动参数整理、问答模式、选择模式和提示语打印',
  sideEffects: false, // 核心：开启 Tree Shaking
  license: 'MIT',
  files: [cjsPrefix, esPrefix, 'LICENSE', 'README.md'],
  exports: {
    '.': {
      import: `./${esPrefix}/index.js`,
      default: `./${esPrefix}/index.js`,
      require: `./${cjsPrefix}/index.js`,
      types: `./${dtsPrefix}/index.d.ts`,
    },
    ...exportsList,
  },
  keywords: ['a-command', '终端', 'terminal'],
  homepage: 'https://earthnut.dev/npm/a-command',
  dependencies,
  bugs: {
    url: 'https://github.com/MrMudBean/a-command/issues',
    email: 'Mr.MudBean@outlook.com',
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/MrMudBean/a-command.git',
    directory: 'packages/core',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  bin: {
    'a-command': 'bin.js',
  },
  // browserslist: ['not'], // 没有
  engines: {
    // 新增：声明 Node.js 兼容版本
    node: '>=18.0.0',
  },
};

{
  // 整理打包后 package.json 文件路径
  const distPackagePath = pathJoin(distParentPath, './dist/package.json');
  // 写入新的 packages.json 文件
  writeJsonFileSync(distPackagePath, packageJson);
}

{
  writeFileSync(
    pathJoin(distParentPath, 'dist/bin.js'),
    `#!/usr/bin/env node
    
import { Command } from './index.mjs';

new Command('a-command').run().isEnd(true);
    `,
  );
}
