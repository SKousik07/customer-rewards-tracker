import { fetchTransactions } from "../mockApi";

const mockData = [
  {
    customerId: "1",
    customerName: "John Doe",
    transactionId: "1",
    amount: 120,
    date: "2025-05-15",
  },
  {
    customerId: "2",
    customerName: "Jane Smith",
    transactionId: "9",
    amount: 85,
    date: "2025-05-03",
  },
];

describe("fetchTransactions", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("resolves with data when fetch is successful", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const promise = fetchTransactions();

    jest.advanceTimersByTime(1500);

    await expect(promise).resolves.toEqual(mockData);

    expect(global.fetch).toHaveBeenCalledWith("/data/mockData.json");
  });

  it("rejects with error when fetch responds with non-ok", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    const promise = fetchTransactions();

    jest.advanceTimersByTime(1500);

    await expect(promise).rejects.toEqual("Network response was not ok");
  });

  it("rejects with error when fetch fails", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Fetch failed"));

    const promise = fetchTransactions();

    jest.advanceTimersByTime(1500);

    await expect(promise).rejects.toEqual("Fetch failed");
  });

  it("rejects with 'No transaction data found' when data is empty", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const promise = fetchTransactions();

    jest.advanceTimersByTime(1500);

    await expect(promise).rejects.toEqual("No transaction data found");
  });
});
