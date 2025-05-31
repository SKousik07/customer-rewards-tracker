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
