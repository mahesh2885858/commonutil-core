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
  if (typeof text !== "string") throw "Not a string";
  if (!text.trim()) throw "String not provided";
  const letters = text.trim().split("");
  let digits = "";
  letters.forEach((letter) => {
    if (!isNaN(parseInt(letter))) {
      digits = digits + letter;
    }
  });
  return digits.trim();
};

/**
 * Validates card expiry date format and checks if it's valid.
 * @param {string} expiry expiry date to validate in MM/YY format
 * @returns {Object} Returns object with properties:
 *               status {boolean} - true if valid, false if invalid
 *               error {string|null} - error message if invalid, null if valid
 * @throws throws error for invalid input
 */
export const isValidExpiryForCard = (
  expiry: string,
): {
  status: boolean;
  error: string | null;
} => {
  const daysPerMonths: { [key: string]: number } = {
    "01": 31,
    "02": 28,
    "03": 31,
    "04": 30,
    "05": 31,
    "06": 30,
    "07": 31,
    "08": 31,
    "09": 30,
    "10": 31,
    "11": 30,
    "12": 31,
  };

  if (!expiry)
    return {
      status: false,
      error: "Input not provided",
    };

  if (typeof expiry !== "string") {
    return {
      status: false,
      error: "Expiry should be strings",
    };
  }
  // trim the String
  const text = expiry.trim();

  // length should be 5
  if (text.length !== 5) {
    return {
      status: false,
      error: "Expiry should be exactly 5 characters length",
    };
  }
  const patternIsMatching = text.match("^(0[1-9]|1[0-2])/([0-9]{2})$");

  if (!patternIsMatching) {
    return {
      status: false,
      error: 'Invalid format. Should be like "01/26" or "11/30" in "MM/YY"',
    };
  }

  const parts = text.split("/");
  const date = parts[0] + "/" + daysPerMonths[parts[0]] + "/" + parts[1];
  const expiryDate = new Date(date);
  if (expiryDate > new Date()) {
    return {
      status: true,
      error: null,
    };
  } else {
    return {
      status: false,
      error: "Already Expired",
    };
  }
};
