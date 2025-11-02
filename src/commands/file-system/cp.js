import { resolve, basename } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { getCurrentDir } from '../../utils/directory-path.js';
import { getArgByNumber, isPathAccessible } from '../../utils/commands.js';

export const cp = async (args) => {
  const sourceArgPath = getArgByNumber(args, 0);
  const destArgPath = getArgByNumber(args, 1);

  const resolvedSourcePath = resolve(getCurrentDir(), sourceArgPath);
  const resolvedDestDirPath = resolve(getCurrentDir(), destArgPath);

  if (!(await isPathAccessible(resolvedSourcePath))) {
    throw new Error('Source path is not accessible.');
  }

  const sourceFilename = basename(resolvedSourcePath);
  const resolvedDestFilePath = resolve(resolvedDestDirPath, sourceFilename);

  const sourceStream = createReadStream(resolvedSourcePath);
  const destStream = createWriteStream(resolvedDestFilePath, { flags: 'wx' });

  await pipeline(sourceStream, destStream);
};
