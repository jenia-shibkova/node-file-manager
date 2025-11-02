import { resolve } from 'path';
import { getCurrentDir } from '../../utils/directory-path.js';

export const up = () => {
  const currentDir = getCurrentDir();
  const parentDir = resolve(currentDir, '..');

  if (currentDir !== parentDir) {
    process.chdir('..');
  }
};
