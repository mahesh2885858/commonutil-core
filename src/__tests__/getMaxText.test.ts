import { getMaxText } from "../index";
import { DEFAULT_GET_MAX_TEXT_LENGTH } from "../constants";

describe("getMaxText", () => {
  // Test Group 1: Input Validation
  test("throws error for null input", () => {
    expect(() => getMaxText(null as any)).toThrow(
      "Invalid or No string provided"
    );
  });

  test("throws error for undefined input", () => {
    expect(() => getMaxText(undefined as any)).toThrow(
      "Invalid or No string provided"
    );
  });

  test("throws error for empty string", () => {
    expect(() => getMaxText("")).toThrow("Invalid or No string provided");
  });

  test("throws error for whitespace-only string", () => {
    expect(() => getMaxText("   ")).toThrow("Invalid or No string provided");
  });

  // Test Group 2: Default Limit Behavior
  test("returns full string when length is less than default limit", () => {
    const input = "Hello";
    expect(getMaxText(input)).toBe("Hello");
  });

  test("returns full string when length equals default limit", () => {
    const input = "1234567890"; // 10 characters
    expect(getMaxText(input)).toBe("1234567890");
  });

  test("truncates string with ellipsis when length exceeds default limit", () => {
    const input = "12345678901234567890"; // 20 characters
    expect(getMaxText(input)).toBe("1234567890...");
  });

  // Test Group 3: Custom Limit Behavior
  test("returns full string when length is less than custom limit", () => {
    const input = "Hello";
    expect(getMaxText(input, 6)).toBe("Hello");
  });

  test("returns full string when length equals custom limit", () => {
    const input = "Hello";
    expect(getMaxText(input, 5)).toBe("Hello");
  });

  test("truncates string with ellipsis when length exceeds custom limit", () => {
    const input = "Hello World";
    expect(getMaxText(input, 5)).toBe("Hello...");
  });

  // Test Group 4: Edge Cases
  test("handles custom limit of 0", () => {
    const input = "Hello";
    expect(getMaxText(input, 0)).toBe("...");
  });

  test("handles custom limit of 1", () => {
    const input = "Hello";
    expect(getMaxText(input, 1)).toBe("H...");
  });

  test("handles very long input string", () => {
    const input = "a".repeat(1000);
    const result = getMaxText(input);
    expect(result.length).toBe(DEFAULT_GET_MAX_TEXT_LENGTH + 3); // limit + '...'
    expect(result.endsWith("...")).toBe(true);
  });
});
