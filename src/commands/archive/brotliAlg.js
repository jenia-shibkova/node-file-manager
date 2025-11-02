import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { getCurrentDir } from '../../utils/directory-path.js';
import { getArgByNumber } from '../../utils/commands.js';

export const brotliHandler = async (args, mode = 'compress') => {
  const source = resolve(getCurrentDir(), getArgByNumber(args, 0));
  const destination = resolve(getCurrentDir(), getArgByNumber(args, 1));

  const brotliStream =
    mode === 'compress' ? createBrotliCompress() : createBrotliDecompress();

  const sourceStream = createReadStream(source);
  const destinationStream = createWriteStream(destination);

  try {
    await pipeline(sourceStream, brotliStream, destinationStream);
  } catch (error) {
    console.error(
      `${mode === 'compress' ? 'Compression' : 'Decompression'} failed: ${
        error.message
      }`
    );
  }
};
