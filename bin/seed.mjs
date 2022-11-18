import setEnv from './set-env.mjs';
import {logCommand, logError} from './utils/utils.mjs';
import {exec} from 'child_process';

await setEnv();

if (process.argv.length < 3) {
  logError('Error : You need to provide the name of the seeder file');
  process.exit(1);
}

const tsNode = 'ts-node';
const typeormSeedingCli = './node_modules/@jorgebodega/typeorm-seeding/dist/cli.js';
const dataSourceParam = '-d ormconfig.ts';
const seedCommand = 'seed';
const seedDir = 'src/database/seeders';
const seedFile = `${pascalCaseToKebabCase(process.argv[2])}.seeder.ts`;
const seedPath = `${seedDir}/${seedFile}`;
const command = [
  tsNode,
  typeormSeedingCli, dataSourceParam,
  seedCommand, seedPath,
].join(' ');

logCommand(command);

exec(command, (err, stdout, stderr) => {
  if (stderr) {
    console.error(stderr);
  }
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});

function pascalCaseToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
}
