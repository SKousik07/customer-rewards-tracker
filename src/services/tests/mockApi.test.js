jest.useFakeTimers();
jest.mock("../../data/mockData", () => ({
  mockData: [{ id: 1 }], // default mock
}));

import { fetchTransactions } from "../mockApi";
import { mockData } from "../../data/mockData";

describe("fetchTransactions", () => {
  it("resolves with mock data when data exists", async () => {
    const promise = fetchTransactions();
    jest.advanceTimersByTime(1500);
    await expect(promise).resolves.toEqual(mockData);
  });

  it("rejects when no mock data is present", async () => {
    jest.resetModules();
    // Override mockData to simulate empty data
    jest.doMock("../../data/mockData", () => ({
      mockData: null,
    }));

    // Re-import with the new mock
    const { fetchTransactions: fetchWithNoData } = await import("../mockApi");

    const promise = fetchWithNoData();
    jest.advanceTimersByTime(1500);
    await expect(promise).rejects.toEqual("No transaction data found");
  });
});
