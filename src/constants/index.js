export const CUSTOMER_TABLE_LABELS = Object.freeze({
  HEADING: "Customer List",
  NAME_HEADER: "Customer Name",
  REWARDS_HEADER: "Total Rewards",
});

export const MONTHS = Object.freeze([
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
]);

export const FILTER_LABELS = Object.freeze({
  SELECT_MONTH: "-- Select Month --",
  SELECT_YEAR: "-- Select Year --",
  RESET_BUTTON: "Reset Filters",
  MONTH: "Month:",
  YEAR: "Year:",
});

export const PAGINATION_LABELS = Object.freeze({
  PREVIOUS: "Previous",
  NEXT: "Next",
});

export const getPaginationLabel = (current, total) =>
  `Page ${current} of ${total}`;

export const COMMON_LABELS = Object.freeze({
  LOADING: "Loading transactions...",
  ERROR: "Something went wrong. Please try again.",
});

export const REWARDS_LABELS = Object.freeze({
  TITLE_PREFIX: "Rewards Summary - ",
  NO_TRANSACTIONS: "No transactions found for the selected filters.",
  TOTAL: "Total",
  POINTS_SUFFIX: "points",
});

export const TABLE_HEADINGS = Object.freeze([
  "Transaction ID",
  "Date",
  "Amount ($)",
  "Reward Points",
]);

export const TABLE_MESSAGES = Object.freeze({
  NO_DATA: "No transactions found for the selected filters.",
  HEADING: "Transaction Details",
});

export const PAGINATION_LIMIT = 5;
