import { EOL } from 'os';

import { ls } from './navigation/ls.js';
import { cd } from './navigation/cd.js';
import { up } from './navigation/up.js';
import { printCurrentDirectory } from '../utils/directory-path.js';

export const COMMANDS = {
  EXIT: { name: '.exit', argCount: 0 },
  CD: { name: 'cd', argCount: 1 },
  UP: { name: 'up', argCount: 0 },
  LS: { name: 'ls', argCount: 0 },
  CAT: { name: 'cat', argCount: 1 },
  ADD: { name: 'add', argCount: 1 },
  RN: { name: 'rn', argCount: 2 },
  CP: { name: 'cp', argCount: 2 },
  MV: { name: 'mv', argCount: 2 },
  RM: { name: 'rm', argCount: 1 },
  OS: { name: 'os', argCount: 1 },
  HASH: { name: 'hash', argCount: 1 },
  COMPRESS: { name: 'compress', argCount: 2 },
  DECOMPRESS: { name: 'decompress', argCount: 2 },
};

export const checkArgCount = (inputCommandName, args) => {
  const foundCommand = Object.entries(COMMANDS).find(
    ([key, { name }]) => name === inputCommandName
  );

  if (foundCommand) {
    const [key, { argCount: expectedArgCount }] = foundCommand;

    if (args.length !== expectedArgCount) {
      throw new Error(
        `Invalid input.${EOL}Command "${inputCommandName}" requires ${expectedArgCount} argument(s).`
      );
    }
  }
};

export const handleInput = async (line, readlineClose) => {
  try {
    const args = line.match(/(').*?\1|\S+/g) || [];
    const command = args.shift();

    checkArgCount(command, args);

    switch (command) {
      case undefined:
        break;
      case COMMANDS.EXIT.name:
        readlineClose();
        break;
      case COMMANDS.CD.name:
        cd(args);
        break;
      case COMMANDS.UP.name:
        up();
        break;
      case COMMANDS.LS.name:
        await ls();
        break;
      default:
        console.log(
          `\x1b${'[31m'}${`Invalid input. Command '${command}' not supported.`}\x1b${'[0m'}`
        );
        break;
    }
  } catch (err) {
    if (err.message.startsWith('Invalid input.')) {
      console.log(`\x1b${'[31m'}${err.message}\x1b${'[0m'}`);
    } else {
      console.log(
        `\x1b${'[31m'}${`Operation failed.${EOL}${err.message}`}\x1b${'[0m'}`
      );
    }
  }

  printCurrentDirectory();
};
