import { readdir } from 'fs/promises';
import { getCurrentDir } from '../../utils/directory-path.js';

export const ls = async () => {
  const directoryEntries = await readdir(getCurrentDir(), {
    withFileTypes: true,
  });

  const getEntryType = (entry) =>
    entry.isFile() ? 'file' : entry.isDirectory() ? 'directory' : 'other';

  const tableData = directoryEntries
    .map((entry) => ({
      Name: entry.name,
      Type: getEntryType(entry),
    }))
    .filter(({ Type }) => Type !== 'other')
    .sort(
      (a, b) => a.Type.localeCompare(b.Type) || a.Name.localeCompare(b.Name)
    );

  console.table(tableData);
};
