import { homedir, EOL } from 'os';
import { getColoredText } from './text-format.js';

export const initHomeDir = () => process.chdir(homedir());

export const getCurrentDir = () => process.cwd();

export const printCurrentDirectory = () => {
  const currentDirPath = getCurrentDir();

  console.log(
    `${EOL}You are currently in ${getColoredText('YELLOW', currentDirPath)}`
  );
};
