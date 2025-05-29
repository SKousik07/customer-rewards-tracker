import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TransactionTable from "../transactionTable";
import * as rewardUtils from "../../utils/rewardUtils";

jest.mock("../../utils/rewardUtils", () => ({
  calculateRewardPoints: jest.fn((amount) => Math.floor(amount)),
}));

const mockTransactions = Array.from({ length: 7 }, (_, i) => ({
  transactionId: `txn-${i + 1}`,
  amount: 100 + i,
  date: "2024-07-01T00:00:00.000Z",
  customerId: "c1",
}));

describe("TransactionTable", () => {
  it("shows 'No transactions' when list is empty", () => {
    render(<TransactionTable filteredTransactions={[]} />);
    expect(
      screen.getByText(/No transactions found for the selected filters/i)
    ).toBeInTheDocument();
  });

  it("renders up to 5 transactions per page", () => {
    render(<TransactionTable filteredTransactions={mockTransactions} />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(6);
  });

  it("renders correct reward points", () => {
    render(<TransactionTable filteredTransactions={mockTransactions} />);
    expect(rewardUtils.calculateRewardPoints).toHaveBeenCalledWith(100);
    expect(rewardUtils.calculateRewardPoints).toHaveBeenCalledTimes(5);
  });

  it("navigates to next page and back", () => {
    render(<TransactionTable filteredTransactions={mockTransactions} />);
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

    const nextBtn = screen.getByText("Next");
    fireEvent.click(nextBtn);

    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    expect(screen.getByText("txn-6")).toBeInTheDocument();

    const prevBtn = screen.getByText("Previous");
    fireEvent.click(prevBtn);
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });

  it("disables navigation buttons correctly", () => {
    render(<TransactionTable filteredTransactions={mockTransactions} />);
    const prevBtn = screen.getByText("Previous");
    expect(prevBtn).toBeDisabled();

    const nextBtn = screen.getByText("Next");
    expect(nextBtn).not.toBeDisabled();
  });
});
