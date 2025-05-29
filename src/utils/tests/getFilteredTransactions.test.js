import { getFilteredTransactions } from "../rewardUtils";

const transactionsMock = [
  { customerId: "1", date: "2025-05-15" },
  { customerId: "1", date: "2025-03-20" },
  { customerId: "2", date: "2024-12-01" },
  { customerId: "1", date: "2024-12-10" },
  { customerId: "1", date: "2025-04-25" },
  { customerId: "1", date: "2025-01-15" },
];

describe("getFilteredTransactions", () => {
  it("filters by month and year correctly", () => {
    const filtered = getFilteredTransactions(
      transactionsMock,
      "1",
      "May",
      "2025"
    );
    expect(filtered.length).toBe(1);
    expect(filtered[0].date).toContain("2025-05");
  });

  it("filters by month only", () => {
    const filtered = getFilteredTransactions(
      transactionsMock,
      "1",
      "December",
      null
    );
    expect(
      filtered.every((t) => {
        const d = new Date(t.date);
        return d.toLocaleString("default", { month: "long" }) === "December";
      })
    ).toBe(true);
  });

  it("filters by year only", () => {
    const filtered = getFilteredTransactions(
      transactionsMock,
      "1",
      null,
      "2024"
    );
    expect(filtered.every((t) => new Date(t.date).getFullYear() === 2024)).toBe(
      true
    );
  });

  it("returns all for customer if month and year not provided", () => {
    const filtered = getFilteredTransactions(transactionsMock, "1");
    expect(filtered.every((t) => t.customerId === "1")).toBe(true);
  });
});
