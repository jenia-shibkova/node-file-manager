import { resolve } from 'path';
import { mkdir } from 'fs/promises';
import { getCurrentDir } from '../../utils/directory-path.js';
import { getArgByNumber } from '../../utils/commands.js';

export const mkdirCmd = async (args) => {
  const dirName = getArgByNumber(args, 0);
  const newDirPath = resolve(getCurrentDir(), dirName);

  try {
    await mkdir(newDirPath);
    console.log(`Directory "${dirName}" created successfully.`);
  } catch (error) {
    console.error(`Failed to create directory: ${error.message}`);
  }
};
