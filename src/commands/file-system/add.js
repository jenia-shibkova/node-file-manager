import { basename, resolve } from 'path';
import { writeFile } from 'fs/promises';
import { getCurrentDir } from '../../utils/directory-path.js';
import { getArgByNumber } from '../../utils/commands.js';

export const add = async (args) => {
  const argPath = getArgByNumber(args, 0);
  const fileBasename = basename(argPath);
  const filePath = resolve(getCurrentDir(), fileBasename);

  await writeFile(filePath, '', { flag: 'wx' });
};
