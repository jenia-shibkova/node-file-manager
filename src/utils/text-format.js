import { COLORS } from './constants.js';

export const getColoredText = (color, text) => {
  const colorCode = COLORS[color] || COLORS.RESET;

  return `${colorCode}${text}${COLORS.RESET}`;
};
