import { getDigits } from "../index";

describe("getDigits", () => {
  test("extracts digits from a mixed string", () => {
    expect(getDigits("abc123def")).toBe("123");
  });

  test("returns all digits when only digits are present", () => {
    expect(getDigits("12345")).toBe("12345");
  });

  test("returns empty string when no digits are present", () => {
    expect(getDigits("no digits here")).toBe("");
  });

  test("extracts digits from string with special characters", () => {
    expect(getDigits("@#123$%")).toBe("123");
  });

  test("handles leading and trailing spaces with digits", () => {
    expect(getDigits(" 123 ")).toBe("123");
  });

  test("throws error for empty string", () => {
    expect(() => getDigits("")).toThrow("String not provided");
  });

  test("throws error for string with only spaces", () => {
    expect(() => getDigits("   ")).toThrow("String not provided");
  });

  test("throws error for number input", () => {
    expect(() => getDigits(123 as any)).toThrow("Not a string");
  });

  test("throws error for object input", () => {
    expect(() => getDigits({ key: "value" } as any)).toThrow("Not a string");
  });

  test("throws error for array input", () => {
    expect(() => getDigits([1, 2, 3] as any)).toThrow("Not a string");
  });

  test("throws error for null input", () => {
    expect(() => getDigits(null as any)).toThrow("Not a string");
  });

  test("throws error for undefined input", () => {
    expect(() => getDigits(undefined as any)).toThrow("Not a string");
  });

  test("extracts digits interspersed with letters", () => {
    expect(getDigits("1a2b3c")).toBe("123");
  });

  test("extracts digits from string with decimal points", () => {
    expect(getDigits("12.34")).toBe("1234");
  });
});
