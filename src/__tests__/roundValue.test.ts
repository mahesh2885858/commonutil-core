import { roundValue } from "../index";

describe("roundValue", () => {
  test("Testing round values", () => {
    expect(roundValue(12.34)).toBe(12);
    expect(roundValue(12.34, 2)).toBe(12.34);
    expect(roundValue(12.34, 1)).toBe(12.3);
    expect(roundValue(12.3, 2)).toBe(12.3);
    expect(roundValue(3456.32334, 3)).toBe(3456.323);
  });
});
