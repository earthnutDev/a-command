import { pathJoin, readFileToJsonSync } from 'a-node-tools';
import { writeFileSync } from 'node:fs';

const packageJson = readFileToJsonSync('./package.json');

delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson['lint-staged'];
delete packageJson.private;

// eslint-disable-next-line no-undef
const distPath = pathJoin(process.cwd(), './dist/package.json');

writeFileSync(distPath, JSON.stringify(packageJson, null, 2));
