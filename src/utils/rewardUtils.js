const calculateRewardPoints = (amount) => {
  let points = 0;

  if (amount > 100) {
    points += (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    points += amount - 50;
  }

  return Math.floor(points);
};

const getRecentThreeMonthsTransactions = (transactions, customerId) => {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  return transactions.filter((transaction) => {
    const txDate = new Date(transaction.date);
    return (
      transaction.customerId === customerId &&
      txDate >= threeMonthsAgo &&
      txDate <= now
    );
  });
};

const getFilteredTransactions = (transactions, customerId, month, year) => {
  return transactions.filter((transaction) => {
    const txDate = new Date(transaction.date);
    const txMonth = txDate.toLocaleString("default", { month: "long" });
    const txYear = txDate.getFullYear().toString();

    const matchesMonth = month ? month === txMonth : true;
    const matchesYear = year ? year === txYear : true;
    return transaction.customerId === customerId && matchesMonth && matchesYear;
  });
};

const getFilterSummary = (month, year) => {
  if (month && year) return `Showing transactions for ${month} ${year}`;
  if (month) return `Showing transactions for ${month}`;
  if (year) return `Showing transactions for ${year}`;
  return "Showing transactions for the recent 3 months";
};

export {
  getRecentThreeMonthsTransactions,
  calculateRewardPoints,
  getFilteredTransactions,
  getFilterSummary,
};
