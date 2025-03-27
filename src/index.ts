/**
 * Return the text with first letter converted to uppercase.
 * Keep in mind that It will trim the string.
 * @param {string} text  text to process
 * @returns {string} text with first letter uppercased and trimmed.
 * @throws throws error if not provided a valid string.
 */

export const uCFirst = (text: string): string => {
  if (!text.trim()) throw "String not provided";
  if (typeof text !== "string") throw "Not a string";
  const letters = text.trim().split("");
  letters[0] = letters[0].toUpperCase();
  return letters.join("");
};

/**
 * Return only digits from the given string.
 * @param {string} text  text to process
 * @returns {string} digits from the string.
 * @throws throws error if not provided a valid string.
 */
export const getDigits = (text: string): string => {
  if (!text.trim()) throw "String not provided";
  if (typeof text !== "string") throw "Not a string";
  const letters = text.trim().split("");
  let digits = "";
  letters.forEach((letter) => {
    if (!isNaN(parseInt(letter))) {
      digits = digits + letter;
    }
  });
  return digits.trim();
};
