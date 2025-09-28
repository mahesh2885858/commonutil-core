/**
 * Return the text with first letter converted to uppercase.
 * Keep in mind that It will trim the string.
 * @param {string} text  text to process
 * @returns {string} text with first letter uppercased and trimmed.
 * @throws throws error if not provided a valid string.
 */

import { DEFAULT_GET_MAX_TEXT_LENGTH } from "./constants";

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
  expiry: string
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
  const year = parseInt("20" + parts[1]);
  const monthIndex = parseInt(parts[0]) - 1;
  var expiryDate = new Date(year, monthIndex, daysPerMonths[parts[0]]);
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

/**
 * Get's the string truncated to the specified limit with ellipsis if necessary.
 * @param {string} [text] - The `text` parameter is a string that represents the text input that you want
 * to process.
 * @param {number} [limit] - Specifies the maximum length of the text that should be returned.
 * Default is 10.
 * @returns {string} Returns truncated string.
 */
export const getMaxText = (text: string, limit?: number): string => {
  if (!text) throw "Invalid or No string provided";
  if (!text || text.trim().length <= 0 || typeof text !== "string")
    throw "Invalid or No string provided";
  const returnLimit = limit ?? DEFAULT_GET_MAX_TEXT_LENGTH;
  const givenTextLength = text.length;
  return givenTextLength <= returnLimit
    ? text
    : text.slice(0, returnLimit).concat("...");
};

/**
 * Format the given digits in Indian or International format.
 * @param {string} digits - The `digits` parameter is a string that represents a sequence of digits
 * (numbers) that you want to format.
 * @param {string} [format='indian'] - The `format` parameter is a string that specifies the desired
 * formatting style for the digits. It can take two possible values: "indian" or "international". If no
 * value is provided, it defaults to "indian".
 * @returns {string} Returns formatted string.
 * @throws throws error if not provided a valid string of digits.
 */
export const formatDigits = (
  digits: string,
  format: "indian" | "international" = "indian"
) => {
  if (!digits) throw "No digits provided";
  if (typeof digits !== "string") throw "Not a string";
  if (!/^\d+$/.test(digits)) throw "Not all characters are digits";

  let formatted = "";
  const splitted = digits.split("");
  let result: string[] = [];

  if (format === "indian") {
    // Indian format: 12,34,56,789
    if (digits.length > 3) {
      const lastThreeDigits = splitted.splice(-3).join("");
      result.push(lastThreeDigits);
      while (splitted.length > 0) {
        result.unshift(splitted.splice(-2).join(""));
      }
      formatted = result.join(",");
    } else {
      result = splitted;
      formatted = result.join("");
    }
  } else {
    // International format: 123,456,789
    while (splitted.length > 0) {
      result.unshift(splitted.splice(-3).join(""));
    }
    formatted = result.join(",");
  }
  return formatted;
};
