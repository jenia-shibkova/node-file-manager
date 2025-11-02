import { rename } from 'fs/promises';
import { basename, resolve, dirname } from 'path';
import { getCurrentDir } from '../../utils/directory-path.js';
import { getArgByNumber } from '../../utils/commands.js';

export const rn = async (args) => {
  const oldPathArg = getArgByNumber(args, 0);
  const newNameArg = getArgByNumber(args, 1);
  const newFilename = basename(newNameArg);
  const oldFilePath = resolve(getCurrentDir(), oldPathArg);
  const fileDir = dirname(oldFilePath);
  const newFilePath = resolve(fileDir, newFilename);

  await rename(oldFilePath, newFilePath);
};
