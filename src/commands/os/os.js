import { EOL, homedir, userInfo } from 'os';
import { cpus } from 'os';

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
        `Default system End-Of-Line: \x1b${'[32m'}${JSON.stringify(
          EOL
        )}\x1b${'[0m'}`
      );
      break;
    case '--cpus':
      getCpuInfo();
      break;
    case '--homedir':
      console.log(`Home directory: \x1b${'[32m'}${homedir()}\x1b${'[0m'}`);
      break;
    case '--username':
      console.log(
        `System user name: \x1b${'[32m'}${userInfo().username}\x1b${'[0m'}`
      );
      break;
    case '--architecture':
      console.log(`CPU architecture: \x1b${'[32m'}${process.arch}\x1b${'[0m'}`);
      break;
    default:
      throw new Error(
        `Invalid input. Command "os" doesn't support argument "${args[0]}"`
      );
      break;
  }
};
