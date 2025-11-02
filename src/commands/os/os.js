import { EOL, homedir, userInfo } from 'os';
import { cpus } from 'os';
import { getColoredText } from '../../utils/text-format.js';

const getCpuInfo = () => {
  const cpuData = cpus().map((cpu) => ({
    Model: cpu.model.trim(),
    'Clock rate, GHz': (cpu.speed / 1000).toFixed(2),
  }));

  console.log(`Overall amount of CPUs: ${cpuData.length}`);
  console.table(cpuData);
};

export const osCommand = (args) => {
  switch (args[0]) {
    case '--EOL':
      console.log(
        'Default system End-Of-Line:',
        getColoredText('MAGENTA', JSON.stringify(EOL))
      );
      break;
    case '--cpus':
      getCpuInfo();
      break;
    case '--homedir':
      console.log('Home directory:', getColoredText('MAGENTA', homedir()));
      break;
    case '--username':
      console.log(
        'System user name:',
        getColoredText('MAGENTA', userInfo().username)
      );
      break;
    case '--architecture':
      console.log('CPU architecture:', getColoredText('MAGENTA', process.arch));
      break;
    default:
      throw new Error(
        `Invalid input. Command "os" doesn't support argument "${args[0]}"`
      );
      break;
  }
};
