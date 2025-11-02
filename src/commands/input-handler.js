import { EOL } from 'os';

import { ls } from './navigation/ls.js';
import { cd } from './navigation/cd.js';
import { up } from './navigation/up.js';
import { cat } from './file-system/cat.js';
import { add } from './file-system/add.js';
import { mkdirCmd } from './file-system/mkdir.js';
import { rn } from './file-system/rn.js';
import { cp } from './file-system/cp.js';
import { mv } from './file-system/mv.js';
import { rm } from './file-system/rm.js';
import { osCommand } from './os/os.js';
import { calculateHash } from './hash/hash.js';
import { brotliHandler } from './archive/brotliAlg.js';

import { printCurrentDirectory } from '../utils/directory-path.js';
import { COMMANDS } from '../utils/constants.js';
import { checkArgCount } from '../utils/commands.js';

export const handleInput = async (line, readlineClose) => {
  try {
    const args = line.match(/(').*?\1|\S+/g) || [];
    const command = args.shift();

    checkArgCount(command, args);

    switch (command) {
      case undefined:
        break;
      case COMMANDS.EXIT.name:
        readlineClose();
        break;
      case COMMANDS.CD.name:
        cd(args);
        break;
      case COMMANDS.UP.name:
        up();
        break;
      case COMMANDS.LS.name:
        await ls();
        break;
      case COMMANDS.CAT.name:
        await cat(args);
        break;
      case COMMANDS.ADD.name:
        await add(args);
        break;
      case COMMANDS.MKDIR.name:
        await mkdirCmd(args);
        break;
      case COMMANDS.RN.name:
        await rn(args);
        break;
      case COMMANDS.CP.name:
        await cp(args);
        break;
      case COMMANDS.MV.name:
        await mv(args);
        break;
      case COMMANDS.RM.name:
        await rm(args);
        break;
      case COMMANDS.OS.name:
        osCommand(args);
        break;
      case COMMANDS.HASH.name:
        await calculateHash(args);
        break;
      case COMMANDS.COMPRESS.name:
        await brotliHandler(args, 'compress');
        break;
      case COMMANDS.DECOMPRESS.name:
        await brotliHandler(args, 'decompress');
        break;
      default:
        console.log(
          `\x1b${'[31m'}${`Invalid input. Command '${command}' not supported.`}\x1b${'[0m'}`
        );
        break;
    }
  } catch (err) {
    if (err.message.startsWith('Invalid input.')) {
      console.log(`\x1b${'[31m'}${err.message}\x1b${'[0m'}`);
    } else {
      console.log(
        `\x1b${'[31m'}${`Operation failed.${EOL}${err.message}`}\x1b${'[0m'}`
      );
    }
  }

  printCurrentDirectory();
};
