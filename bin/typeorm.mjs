import {createInterface} from 'readline';

import {exec} from 'child_process';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
    'In what environment do you want to run the app? \n'
    + '[dev, test, prod] ' + inLightGrey('(dev)') + ' : ',
    handleAnswer,
);

rl.on('close', () => handleClose());

function handleAnswer(answer) {
  if (answer === '\u0003') {
    rl.close();
  }

  let env = '';
  if (['dev', 'test', 'prod'].includes(answer)) {
    env = answer;
  } else if (answer === '') {
    env = 'dev';
  } else {
    console.log('Invalid environment');
    process.exit(1);
  }

  process.env.NODE_ENV = env;
  console.log('Environment set to', env);

  rl.close();
}

function handleClose() {
  if (!process.env.NODE_ENV) {
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const command = 'typeorm-ts-node-commonjs ' + args.join(' ');
  console.log(inLightGrey(`$ ${command}`));
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
}

function inLightGrey(text) {
  return `\u001b[2m${text}\u001b[0m`;
}
