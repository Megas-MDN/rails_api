const bigString =
  'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getRamdomChar = (bigStr) =>
  bigStr[Math.floor(Math.random() * bigStr.length)];

const getNRandom = (num, str = '') =>
  num <= 0 ? str : getNRandom(num - 1, str + getRamdomChar(bigString));

const getNstringsNTimes = (nChars, numStrings, arr) => {
  arr.push(getNRandom(nChars)); // xy12
  if (numStrings <= 1) return arr.join('-'); // xyz0-123z-...-str6
  return getNstringsNTimes(nChars, numStrings - 1, arr);
};

const generateId = (nChars = 4, numStrings = 4) =>
  getNstringsNTimes(nChars, numStrings, []);
