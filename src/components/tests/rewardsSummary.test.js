import React from "react";
import { render, screen } from "@testing-library/react";
import RewardsSummary from "../rewardsSummary";

const mockCustomer = {
  customerId: "c1",
  customerName: "Alice",
};

const mockTransactions = [
  { amount: 120, date: "2024-07-15", customerId: "c1" },
  { amount: 90, date: "2024-07-20", customerId: "c1" },
  { amount: 45, date: "2024-06-01", customerId: "c1" },
  { amount: 110, date: "2024-06-12", customerId: "c1" },
];

describe("RewardsSummary", () => {
  it("should render nothing when selectedCustomer is not provided", () => {
    const { container } = render(
      <RewardsSummary filteredTransactions={mockTransactions} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should show no transactions message when transaction list is empty", () => {
    render(
      <RewardsSummary
        filteredTransactions={[]}
        selectedCustomer={mockCustomer}
      />
    );
    expect(
      screen.getByText(/No transactions found for the selected filters/i)
    ).toBeInTheDocument();
  });

  it("should render correct monthly and total rewards", () => {
    render(
      <RewardsSummary
        filteredTransactions={mockTransactions}
        selectedCustomer={mockCustomer}
      />
    );

    expect(screen.getByText(/Rewards Summary - Alice/i)).toBeInTheDocument();

    expect(screen.getByText("July 2024")).toBeInTheDocument();
    expect(screen.getByText("130 points")).toBeInTheDocument();

    expect(screen.getByText("June 2024")).toBeInTheDocument();
    expect(screen.getByText("70 points")).toBeInTheDocument();

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("200 points")).toBeInTheDocument();
  });
});
