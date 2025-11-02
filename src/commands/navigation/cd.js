import { isAbsolute, resolve } from 'path';
import { getArgByNumber } from '../../utils/commands.js';

export const cd = (args) => {
  const path = getArgByNumber(args, 0);

  const isWinOsIncompleteRootPath =
    process.platform === 'win32' && !isAbsolute(path) && path.includes(':');
  const improvedPath = resolve(
    isWinOsIncompleteRootPath ? '/' : process.cwd(),
    path
  );

  process.chdir(improvedPath);
};
