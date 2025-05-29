import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../filters";

describe("Filters component", () => {
  const filtersMock = { month: "", year: "" };
  const onChangeMock = jest.fn();
  const onResetMock = jest.fn();

  beforeEach(() => {
    onChangeMock.mockClear();
    onResetMock.mockClear();
  });

  it("renders month and year dropdowns and reset button", () => {
    render(
      <Filters
        filters={filtersMock}
        onChange={onChangeMock}
        onReset={onResetMock}
      />
    );

    expect(screen.getByLabelText(/Month:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reset filters/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: "-- Select Month --" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: "-- Select Year --" })
    ).toBeInTheDocument();
  });

  it("calls onChange with correct args when month is changed", () => {
    render(
      <Filters
        filters={filtersMock}
        onChange={onChangeMock}
        onReset={onResetMock}
      />
    );

    fireEvent.change(screen.getByLabelText(/Month:/i), {
      target: { value: "March" },
    });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("month", "March");
  });

  it("calls onChange with correct args when year is changed", () => {
    render(
      <Filters
        filters={filtersMock}
        onChange={onChangeMock}
        onReset={onResetMock}
      />
    );

    fireEvent.change(screen.getByLabelText(/Year:/i), {
      target: { value: "2023" },
    });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("year", "2023");
  });

  it("calls onReset when reset button is clicked", () => {
    render(
      <Filters
        filters={filtersMock}
        onChange={onChangeMock}
        onReset={onResetMock}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /reset filters/i }));

    expect(onResetMock).toHaveBeenCalledTimes(1);
  });

  it("displays the correct filter summary text", () => {
    const { rerender } = render(
      <Filters
        filters={{ month: "April", year: "2024" }}
        onChange={onChangeMock}
        onReset={onResetMock}
      />
    );
    expect(
      screen.getByText("Showing transactions for April 2024")
    ).toBeInTheDocument();

    rerender(
      <Filters
        filters={{ month: "May", year: "" }}
        onChange={onChangeMock}
        onReset={onResetMock}
      />
    );
    expect(
      screen.getByText("Showing transactions for May")
    ).toBeInTheDocument();

    rerender(
      <Filters
        filters={{ month: "", year: "2022" }}
        onChange={onChangeMock}
        onReset={onResetMock}
      />
    );
    expect(
      screen.getByText("Showing transactions for 2022")
    ).toBeInTheDocument();

    rerender(
      <Filters
        filters={{ month: "", year: "" }}
        onChange={onChangeMock}
        onReset={onResetMock}
      />
    );
    expect(
      screen.getByText("Showing transactions for the recent 3 months")
    ).toBeInTheDocument();
  });
});
