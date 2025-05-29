import React, { useEffect, useState, useMemo } from "react";
import { fetchTransactions } from "./services/mockApi";
import CustomerList from "./components/customerList";
import {
  calculateRewardPoints,
  getFilteredTransactions,
  getRecentThreeMonthsTransactions,
} from "./utils/rewardUtils";
import Filters from "./components/filters";
import { CenterWrapper } from "./styles/commonStyles";
import RewardsSummary from "./components/rewardsSummary";
import TransactionTable from "./components/transactionTable";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [filters, setFilters] = useState({ month: "", year: "" });
  const [useRecent3Months, setUseRecent3Months] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await fetchTransactions();
        setTransactions(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transactions. Please try again later.");
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Group all transactions by customer and calculate total rewards
  const customerRewardsSummary = useMemo(() => {
    const summary = {};
    transactions.forEach((tx) => {
      const reward = calculateRewardPoints(tx.amount);
      if (!summary[tx.customerId]) {
        summary[tx.customerId] = {
          customerId: tx.customerId,
          customerName: tx.customerName,
          totalRewards: 0,
        };
      }
      summary[tx.customerId].totalRewards += reward;
    });
    return Object.values(summary);
  }, [transactions]);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setFilters({ month: "", year: "" }); // Reset filters
    setUseRecent3Months(true); // Re-enable recent 3 months
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setUseRecent3Months(false); // Switch off default mode when user selects month/year
  };

  const handleFilterReset = () => {
    setFilters({ month: "", year: "" });
    setUseRecent3Months(true);
  };

  const filteredTransactions = useRecent3Months
    ? getRecentThreeMonthsTransactions(
        transactions,
        selectedCustomer.customerId
      )
    : getFilteredTransactions(
        transactions,
        selectedCustomer.customerId,
        filters.month,
        filters.year
      );

  return (
    <>
      {loading && <div className="loading">Loading transactions...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <>
          <CustomerList
            customers={customerRewardsSummary}
            selectedCustomer={selectedCustomer}
            onChange={handleCustomerSelect}
          />
          {selectedCustomer && (
            <>
              <CenterWrapper>
                <Filters
                  filters={filters}
                  onChange={handleFilterChange}
                  onReset={handleFilterReset}
                />
              </CenterWrapper>
              <RewardsSummary
                filteredTransactions={filteredTransactions}
                selectedCustomer={selectedCustomer}
              />
              <TransactionTable filteredTransactions={filteredTransactions} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
