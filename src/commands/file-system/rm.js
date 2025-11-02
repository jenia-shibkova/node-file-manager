import { resolve } from 'path';
import { unlink } from 'fs/promises';
import { getCurrentDir } from '../../utils/directory-path.js';
import { getArgByNumber } from '../../utils/commands.js';

export const rm = async (args) => {
  const argPath = getArgByNumber(args, 0);
  const filePath = resolve(getCurrentDir(), argPath);

  await unlink(filePath);
};
