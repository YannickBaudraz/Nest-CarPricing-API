import {exec} from 'child_process';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import setEnv from './set-env.mjs';
import {logCommand} from './utils/utils.mjs';

await setEnv();

const args = process.argv.slice(2);
if (args[0] === 'migration:create') {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const migrationDir = join(__dirname, '..', 'src', 'database', 'migrations');
  args[1] = join(migrationDir, args[1]);
}
const command = 'typeorm-ts-node-commonjs ' + args.join(' ');
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
