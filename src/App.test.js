import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../src/App";
import * as api from "../src/services/mockApi";

const mockTransactions = [
  {
    transactionId: "T1",
    date: "2023-08-15",
    amount: 120,
    customerId: "C1",
    customerName: "Alice",
  },
  {
    transactionId: "T2",
    date: "2023-07-10",
    amount: 90,
    customerId: "C1",
    customerName: "Alice",
  },
  {
    transactionId: "T3",
    date: "2023-08-01",
    amount: 45,
    customerId: "C2",
    customerName: "Bob",
  },
];

jest.mock("../src/services/mockApi", () => ({
  fetchTransactions: jest.fn(),
}));

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading, loads transactions, and displays customer list", async () => {
    api.fetchTransactions.mockResolvedValue(mockTransactions);

    render(<App />);
    expect(screen.getByText(/Loading transactions/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  });

  it("selects a customer and shows reward summary and transaction table", async () => {
    api.fetchTransactions.mockResolvedValue(mockTransactions);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Alice"));

    expect(await screen.findByText(/Month:/i)).toBeInTheDocument();

    expect(screen.getByText(/Rewards Summary - Alice/i)).toBeInTheDocument();

    expect(screen.getByText(/Transaction Details/i)).toBeInTheDocument();
  });

  it("shows error message when API call fails", async () => {
    api.fetchTransactions.mockRejectedValue("API failure");

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to fetch transactions/i)
      ).toBeInTheDocument();
    });
  });
});
