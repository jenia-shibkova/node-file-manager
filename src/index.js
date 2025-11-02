import { createInterface } from 'readline/promises';
import { showWelcomeMessage, showFarewellMessage } from './utils/user.js';
import { printCurrentDirectory, initHomeDir } from './utils/directory-path.js';
import { handleInput } from './commands/input-handler.js';

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
  initHomeDir();
  printCurrentDirectory();
  readline.prompt();

  readline.on('close', showFarewellMessage);
  readline.on('line', async (input) => {
    await handleInput(input, readlineClose);
    readline.prompt();
  });
};

init();
