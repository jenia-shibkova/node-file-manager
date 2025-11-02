import { EOL } from 'os';

import { getColoredText } from './text-format.js';

const USERNAME_ARG = 'username';
const DEFAULT_USERNAME = 'Anonymous';

const getArgValue = (argName) => {
  const args = process.argv.slice(2);
  const foundArg = args.find((arg) => arg.startsWith(`--${argName}=`));

  return foundArg ? foundArg.split('=')[1] : null;
};

const getUserName = () => {
  const username = getArgValue(USERNAME_ARG);

  return username || DEFAULT_USERNAME;
};

export const showWelcomeMessage = () => {
  const userName = getUserName();
  const coloredUserName = getColoredText('BLUE', userName);

  if (userName === DEFAULT_USERNAME) {
    console.log(
      'No username specified. Using default username: %s.',
      coloredUserName
    );
  }

  console.log('Welcome to the File Manager, %s!', coloredUserName);
};

export const showFarewellMessage = () => {
  const userName = getUserName();

  console.log(
    `${EOL}Thank you for using File Manager, ${getColoredText(
      'BLUE',
      userName
    )}, goodbye!`
  );
};
