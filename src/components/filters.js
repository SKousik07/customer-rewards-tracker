import React from "react";
import PropTypes from "prop-types";
import {
  FilterWrapper,
  Label,
  Select,
  ResetButton,
  FilterSummary,
} from "../styles/filterStyles";
import { VerticalCenterWrapper } from "../styles/commonStyles";
import { getFilterSummary } from "../utils/rewardUtils";
import { MONTHS, FILTER_LABELS } from "../constants";

const Filters = ({ filters, onChange, onReset }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <>
      <FilterWrapper>
        <Label htmlFor="month-select">{FILTER_LABELS.MONTH}</Label>
        <Select
          id="month-select"
          value={filters.month}
          onChange={(e) => onChange("month", e.target.value)}
        >
          <option value="">{FILTER_LABELS.SELECT_MONTH}</option>
          {MONTHS.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Select>

        <Label htmlFor="year-select">{FILTER_LABELS.YEAR}</Label>
        <Select
          id="year-select"
          value={filters.year}
          onChange={(e) => onChange("year", e.target.value)}
        >
          <option value="">{FILTER_LABELS.SELECT_YEAR}</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>

        <ResetButton onClick={onReset}>
          {FILTER_LABELS.RESET_BUTTON}
        </ResetButton>
      </FilterWrapper>
      <VerticalCenterWrapper>
        <FilterSummary>
          {getFilterSummary(filters.month, filters.year)}
        </FilterSummary>
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
