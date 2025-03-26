/**
 * Return the text with first letter converted to uppercase.
 * Keep in mind that It will trim the string.
 * @param {string} text - text to process
 * @returns {string} - text with first letter uppercased and trimmed.
 */

export const uCFirst = (text: string): string => {
  const letters = text.trim().split("");
  letters[0] = letters[0].toUpperCase();
  return letters.join("");
};
