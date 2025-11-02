export const trimQuotes = (path) => {
  if (!path) {
    return '';
  } else {
    return path.trim().replace(/^"|"$/g, '');
  }
};

export const getArgByNumber = (args, number) => {
  let argument = args[number] || '';

  return trimQuotes(argument);
};
