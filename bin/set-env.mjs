import {createInterface} from 'readline';
import {inLightGrey} from './utils/utils.mjs';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('close', () => {
  if (!process.env.NODE_ENV) {
    process.exit(1);
  }
});

export default function setEnv() {
  rl.question(
      'In what environment do you want to run the app? \n'
      + '[dev, test, prod] ' + inLightGrey('(dev)') + ' : ',
      handleAnswer,
  );

  return new Promise((resolve) => {
    rl.on('close', resolve);
  });
}

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
