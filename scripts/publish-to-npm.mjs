import { execa } from 'execa';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';

const rootDir = process.cwd();

const argv = yargs(hideBin(process.argv)).argv
const packageJsonData = JSON.parse(
    await fs.readFile(path.join(rootDir, 'package.json'))
);
await Promise.all(['.'].map((item) => {
    const publishCmd = `npm publish --tag ${argv.tag} --registry=https://registry.npmjs.org/ --access public`;
    return execa(publishCmd, { shell: true, stdio: 'inherit', cwd: path.join(rootDir, item) });
}))
