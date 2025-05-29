import { getRecentThreeMonthsTransactions } from "../rewardUtils";

const transactionsMock = [
  { customerId: "1", date: "2025-05-15" },
  { customerId: "1", date: "2025-03-20" },
  { customerId: "2", date: "2024-12-01" },
  { customerId: "1", date: "2024-12-10" },
  { customerId: "1", date: "2025-04-25" },
  { customerId: "1", date: "2025-01-15" },
];

describe("getRecentThreeMonthsTransactions", () => {
  it("returns only transactions within last 3 months for given customer", () => {
    const filtered = getRecentThreeMonthsTransactions(transactionsMock, "1");
    expect(filtered.every((t) => t.customerId === "1")).toBe(true);

    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    filtered.forEach((t) => {
      const date = new Date(t.date);
      expect(date >= threeMonthsAgo && date <= now).toBe(true);
    });
  });
});
