import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../src/App";
import * as api from "../src/services/mockApi"; // import the mockable fetch function

// Sample mock data
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

    // Wait for transactions to be fetched and loaded
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

    // Click on Alice
    fireEvent.click(screen.getByText("Alice"));

    // Filters section should be visible
    expect(await screen.findByText(/Month:/i)).toBeInTheDocument();

    // Rewards summary for Alice
    expect(screen.getByText(/Rewards Summary - Alice/i)).toBeInTheDocument();

    // Transaction table heading
    expect(screen.getByText(/Transaction Details/i)).toBeInTheDocument();

    // // Transaction data
    // expect(screen.getByText("T1")).toBeInTheDocument();
    // expect(screen.getByText("T2")).toBeInTheDocument();
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
