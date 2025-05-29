import React from "react";
import PropTypes from "prop-types";
import {
  FilterWrapper,
  Label,
  Select,
  ResetButton,
} from "../styles/filterStyles";
import { VerticalCenterWrapper } from "../styles/commonStyles";
import { getFilterSummary } from "../utils/rewardUtils";

const Filters = ({ filters, onChange, onReset }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <>
      <FilterWrapper>
        <Label htmlFor="month-select">Month:</Label>
        <Select
          id="month-select"
          value={filters.month}
          onChange={(e) => onChange("month", e.target.value)}
        >
          <option value="">-- Select Month --</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Select>

        <Label htmlFor="year-select">Year:</Label>
        <Select
          id="year-select"
          value={filters.year}
          onChange={(e) => onChange("year", e.target.value)}
        >
          <option value="">-- Select Year --</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>

        <ResetButton onClick={onReset}>Reset Filters</ResetButton>
      </FilterWrapper>
      <VerticalCenterWrapper>
        {getFilterSummary(filters.month, filters.year)}
      </VerticalCenterWrapper>
    </>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({
    month: PropTypes.string,
    year: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Filters;
