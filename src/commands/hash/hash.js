import { resolve } from 'path';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { getArgByNumber } from '../../utils/commands.js';
import { getCurrentDir } from '../../utils/directory-path.js';

export const calculateHash = async (args) => {
  const argPath = getArgByNumber(args, 0);
  const resolvedPath = resolve(getCurrentDir(), argPath);

  return new Promise((res, rej) => {
    const readStream = createReadStream(resolvedPath);
    const hash = createHash('sha256');

    readStream.on('data', (chunk) => hash.update(chunk));
    readStream.on('end', () => {
      console.log(hash.digest('hex'));
      res();
    });
    readStream.on('error', (error) => rej(error));
  });
};
