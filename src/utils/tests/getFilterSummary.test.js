import { getFilterSummary } from "../rewardUtils";

describe("getFilterSummary", () => {
  it("returns combined month and year summary", () => {
    expect(getFilterSummary("May", "2025")).toBe(
      "Showing transactions for May 2025"
    );
  });

  it("returns month only summary", () => {
    expect(getFilterSummary("June", null)).toBe(
      "Showing transactions for June"
    );
  });

  it("returns year only summary", () => {
    expect(getFilterSummary(null, "2024")).toBe(
      "Showing transactions for 2024"
    );
  });

  it("returns default summary when no filters", () => {
    expect(getFilterSummary(null, null)).toBe(
      "Showing transactions for the recent 3 months"
    );
  });
});
