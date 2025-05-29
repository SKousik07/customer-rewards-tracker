const calculateRewardPoints = (amount) => {
  let points = 0;

  if (amount > 100) {
    points += (amount - 100) * 2 + 50; // 2 pts over $100 + 1 pt for $50–$100
  } else if (amount > 50) {
    points += amount - 50; // 1 pt per dollar between $50–$100
  }

  return Math.floor(points); // Handle decimal amounts
};

const getRecentThreeMonthsTransactions = (transactions, customerId) => {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3); // last 3 months including current

  return transactions.filter((t) => {
    const txDate = new Date(t.date);
    return (
      t.customerId === customerId && txDate >= threeMonthsAgo && txDate <= now
    );
  });
};

const getFilteredTransactions = (transactions, customerId, month, year) => {
  return transactions.filter((t) => {
    const txDate = new Date(t.date);
    const txMonth = txDate.toLocaleString("default", { month: "long" });
    const txYear = txDate.getFullYear().toString();

    const matchesMonth = month ? month === txMonth : true;
    const matchesYear = year ? year === txYear : true;
    return t.customerId === customerId && matchesMonth && matchesYear;
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
