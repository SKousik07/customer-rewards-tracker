import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomerList from "../customerList";

const customersMock = [
  { customerId: "1", customerName: "Alice", totalRewards: 150 },
  { customerId: "2", customerName: "Bob", totalRewards: 200 },
];

const selectedCustomerMock = {
  customerId: "1",
  customerName: "Alice",
  totalRewards: 150,
};

describe("CustomerList", () => {
  it("renders the customer table with names and rewards", () => {
    render(
      <CustomerList
        customers={customersMock}
        selectedCustomer={selectedCustomerMock}
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Customer List")).toBeInTheDocument();
    expect(screen.getByText("Customer Name")).toBeInTheDocument();
    expect(screen.getByText("Total Rewards")).toBeInTheDocument();

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });

  it("highlights the selected customer row", () => {
    const { container } = render(
      <CustomerList
        customers={customersMock}
        selectedCustomer={selectedCustomerMock}
        onChange={() => {}}
      />
    );

    const rows = container.querySelectorAll("tr");
    const aliceRow = Array.from(rows).find((tr) =>
      tr.textContent.includes("Alice")
    );
  });

  it("calls onChange callback with correct customer when clicked", () => {
    const onChangeMock = jest.fn();

    render(
      <CustomerList
        customers={customersMock}
        selectedCustomer={selectedCustomerMock}
        onChange={onChangeMock}
      />
    );

    fireEvent.click(screen.getByText("Bob"));
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(customersMock[1]);
  });
});
