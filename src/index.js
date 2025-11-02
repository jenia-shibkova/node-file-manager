import { createInterface } from 'readline/promises';
import { showWelcomeMessage, showFarewellMessage } from './utils/user.js';

const init = () => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  });

  const readlineClose = () => {
    readline.close();
    process.exit(0);
  };

  showWelcomeMessage();

  readline.on('close', showFarewellMessage);
};

init();
