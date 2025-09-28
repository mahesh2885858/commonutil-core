import { formatDigits } from "../index";

describe("formatDigits", () => {
  // Test Group 1: Input Validation
  test("throws error for null input", () => {
    expect(() => formatDigits(null as any)).toThrow("No digits provided");
  });

  test("throws error for undefined input", () => {
    expect(() => formatDigits(undefined as any)).toThrow("No digits provided");
  });

  test("throws error for non-string input", () => {
    expect(() => formatDigits(12345 as any)).toThrow("Not a string");
  });

  test("throws error for string with non-digit characters", () => {
    expect(() => formatDigits("123a45")).toThrow(
      "Not all characters are digits"
    );
  });

  // Test Group 2: Indian Format
  test("formats digits in Indian format correctly", () => {
    expect(formatDigits("123456789")).toBe("12,34,56,789");
    expect(formatDigits("1000")).toBe("1,000");
    expect(formatDigits("100")).toBe("100");
    expect(formatDigits("1")).toBe("1");
    expect(formatDigits("1234567")).toBe("12,34,567");
  });

  // Test Group 3: International Format
  test("formats digits in International format correctly", () => {
    expect(formatDigits("123456789", "international")).toBe("123,456,789");
    expect(formatDigits("1000", "international")).toBe("1,000");
    expect(formatDigits("100", "international")).toBe("100");
    expect(formatDigits("1", "international")).toBe("1");
    expect(formatDigits("1234567", "international")).toBe("1,234,567");
  });

  // Test Group 4: Edge Cases
  test("handles edge cases correctly", () => {
    expect(formatDigits("0")).toBe("0");
    expect(formatDigits("00")).toBe("00");
    expect(formatDigits("0000")).toBe("0,000");
    expect(formatDigits("0000000")).toBe("00,00,000");
  });
});
