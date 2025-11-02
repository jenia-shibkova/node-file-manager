import { access } from 'fs/promises';
import { COMMANDS } from './constants.js';

export const trimQuotes = (path) => {
  if (!path) {
    return '';
  } else {
    return path.trim().replace(/^"|"$/g, '');
  }
};

export const getArgByNumber = (args, number) => {
  let argument = args[number] || '';

  return trimQuotes(argument);
};

export const isPathAccessible = async (path) => {
  try {
    await access(path);
    return true;
  } catch (error) {
    console.debug(`Path not accessible: ${path} (${error.code})`);
    return false;
  }
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
