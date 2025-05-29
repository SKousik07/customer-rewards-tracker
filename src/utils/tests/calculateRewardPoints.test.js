import { calculateRewardPoints } from "../rewardUtils";

describe("calculateRewardPoints", () => {
  it("should return 0 for amount <= 50", () => {
    expect(calculateRewardPoints(50)).toBe(0);
    expect(calculateRewardPoints(20)).toBe(0);
  });

  it("should return correct points for amount between 51 and 100", () => {
    expect(calculateRewardPoints(75)).toBe(25);
    expect(calculateRewardPoints(60)).toBe(10);
  });

  it("should return correct points for amount over 100 (whole number)", () => {
    expect(calculateRewardPoints(120)).toBe(90);
  });

  it("should return correct points for fractional amount > 100", () => {
    expect(calculateRewardPoints(105.25)).toBe(60);
  });

  it("should return 0 for negative amounts", () => {
    expect(calculateRewardPoints(-20)).toBe(0);
  });

  it("should return 0 for NaN or non-number", () => {
    expect(calculateRewardPoints("abc")).toBe(0);
    expect(calculateRewardPoints(undefined)).toBe(0);
    expect(calculateRewardPoints(null)).toBe(0);
  });

  it("should floor the points if result is a decimal", () => {
    expect(calculateRewardPoints(105.75)).toBe(61);
  });
});
