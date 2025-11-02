import { resolve } from 'path';
import { createReadStream } from 'fs';
import { EOL } from 'os';
import { getCurrentDir } from '../../utils/directory-path.js';
import { getArgByNumber } from '../../utils/commands.js';

export const cat = async (args) => {
  const argPath = getArgByNumber(args, 0);
  const resolvedPath = resolve(getCurrentDir(), argPath);

  return new Promise((resolve, reject) => {
    const readStream = createReadStream(resolvedPath);

    readStream.on('data', (chunk) =>
      process.stdout.write(`${EOL}${chunk.toString()}`)
    );
    readStream.on('end', resolve);
    readStream.on('error', (error) => reject(error));
  });
};
