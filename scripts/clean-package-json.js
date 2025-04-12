import {
  pathJoin,
  readFileToJsonSync,
  getDirectoryBy,
  writeJsonFile,
  runOtherCode,
} from 'a-node-tools';
import { writeFileSync } from 'node:fs';

let packageJson = readFileToJsonSync('./package.json');

['scripts', 'devDependencies', 'lint-staged', 'private'].forEach(
  key => delete packageJson[key],
);

packageJson = {
  ...packageJson,
  main: 'cjs/index.cjs',
  module: 'mjs/index.mjs',
  types: 'types/index.d.ts',
  files: ['bin', 'mjs', 'cjs', 'types'],
  repository: {
    type: 'git',
    url: 'git+https://github.com/earthnutDev/a-command.git',
  },
  author: {
    name: 'earthnut',
    email: 'earthnut.dev@outlook.com',
    url: 'https://earthnut.dev',
  },
  keywords: ['a-command'],
  exports: {
    '.': {
      import: {
        default: './mjs/index.mjs',
        types: './types/index.d.ts',
      },
      require: {
        default: './cjs/index.cjs',
        types: './types/index.d.ts',
      },
    },
    './types/args': './types/src/argTool/types.d.ts',
    './types/question': './types/src/question/types.d.ts',
    './types/selection': './types/src/selection/types.d.ts',
  },
  homepage: 'https://earthnut.dev/a-command',
  bugs: {
    url: 'https://github.com/earthnutDev/a-command/issues',
    email: 'earthnut.dev@outlook.com',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  bin: {
    'a-command': 'bin/index.js',
  },
};

const distPath = getDirectoryBy('dist', 'directory');

const distPackagePath = pathJoin(distPath, './dist/package.json');

writeJsonFile(distPackagePath, packageJson);

await runOtherCode('mkdir -p dist/bin');

writeFileSync(
  'dist/bin/index.js',
  `#!/usr/bin/env node

import { Command } from '../mjs/index.mjs';

new Command('a-command').run().isEnd(true);
  `,
);
