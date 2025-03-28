import { isValidExpiryForCard } from "../index";

describe("isValidExpiryForCard", () => {
  /** Test Group 1: Non-string Inputs */
  test("returns error for null input", () => {
    expect(isValidExpiryForCard(null as any)).toEqual({
      status: false,
      error: "Input not provided",
    });
  });

  test("returns error for undefined input", () => {
    expect(isValidExpiryForCard(undefined as any)).toEqual({
      status: false,
      error: "Input not provided",
    });
  });

  test("returns error for number input", () => {
    expect(isValidExpiryForCard(12345 as any)).toEqual({
      status: false,
      error: "Expiry should be strings",
    });
  });

  test("returns error for object input", () => {
    expect(isValidExpiryForCard({} as any)).toEqual({
      status: false,
      error: "Expiry should be strings",
    });
  });

  /** Test Group 2: Empty String */
  test("returns error for empty string", () => {
    expect(isValidExpiryForCard("")).toEqual({
      status: false,
      error: "Input not provided",
    });
  });

  /** Test Group 3: Incorrect String Length */
  test("returns error for string longer than 5 characters", () => {
    expect(isValidExpiryForCard("12/345")).toEqual({
      status: false,
      error: "Expiry should be exactly 5 characters length",
    });
  });

  test("returns error for string shorter than 5 characters", () => {
    expect(isValidExpiryForCard("1/23")).toEqual({
      status: false,
      error: "Expiry should be exactly 5 characters length",
    });
  });

  /** Test Group 4: Invalid Format */
  test("returns error for invalid format with extra digits", () => {
    expect(isValidExpiryForCard("123/45")).toEqual({
      status: false,
      error: "Expiry should be exactly 5 characters length",
    });
  });

  test("returns error for invalid format with wrong separator", () => {
    expect(isValidExpiryForCard("12-34")).toEqual({
      status: false,
      error: 'Invalid format. Should be like "01/26" or "11/30" in "MM/YY"',
    });
  });

  test("returns error for invalid format with letters", () => {
    expect(isValidExpiryForCard("Dec/25")).toEqual({
      status: false,
      error: "Expiry should be exactly 5 characters length",
    });
  });

  test("returns error for invalid month greater than 12", () => {
    expect(isValidExpiryForCard("13/25")).toEqual({
      status: false,
      error: 'Invalid format. Should be like "01/26" or "11/30" in "MM/YY"',
    });
  });

  test("returns error for invalid month less than 01", () => {
    expect(isValidExpiryForCard("00/25")).toEqual({
      status: false,
      error: 'Invalid format. Should be like "01/26" or "11/30" in "MM/YY"',
    });
  });

  /** Test Group 5: Expired Date */
  test("returns error for date far in the past", () => {
    expect(isValidExpiryForCard("01/00")).toEqual({
      status: false,
      error: "Already Expired",
    });
  });

  /** Test Group 6: Future Date */
  test("returns valid for date far in the future", () => {
    expect(isValidExpiryForCard("12/99")).toEqual({
      status: true,
      error: null,
    });
  });

  /** Test Group 7: Relative Dates */
  test("returns valid for next month", () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Last two digits
    const currentMonth = currentDate.getMonth() + 1; // 1-12
    let nextMonth = currentMonth + 1;
    let nextYear = currentYear;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    const nextMonthStr = nextMonth.toString().padStart(2, "0");
    const nextYearStr = nextYear.toString().padStart(2, "0");
    const nextExpiry = `${nextMonthStr}/${nextYearStr}`;
    expect(isValidExpiryForCard(nextExpiry)).toEqual({
      status: true,
      error: null,
    });
  });

  test("returns error for last month", () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    let lastMonth = currentMonth - 1;
    let lastYear = currentYear;
    if (lastMonth < 1) {
      lastMonth = 12;
      lastYear -= 1;
    }
    const lastMonthStr = lastMonth.toString().padStart(2, "0");
    const lastYearStr = lastYear.toString().padStart(2, "0");
    const lastExpiry = `${lastMonthStr}/${lastYearStr}`;
    expect(isValidExpiryForCard(lastExpiry)).toEqual({
      status: false,
      error: "Already Expired",
    });
  });

  /** Test Group 8: Current Month (Conditional) */
  test("handles current month based on day of month", () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentMonthStr = currentMonth.toString().padStart(2, "0");
    const currentYearStr = currentYear.toString().padStart(2, "0");
    const currentExpiry = `${currentMonthStr}/${currentYearStr}`;

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
    const lastDay = daysPerMonths[currentMonthStr];

    if (currentDay <= lastDay) {
      expect(isValidExpiryForCard(currentExpiry)).toEqual({
        status: true,
        error: null,
      });
    } else {
      expect(isValidExpiryForCard(currentExpiry)).toEqual({
        status: false,
        error: "Already Expired",
      });
    }
  });
});
