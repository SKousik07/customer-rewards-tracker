import React, { useEffect, useState, useMemo } from "react";
import { fetchTransactions } from "./services/mockApi";
import CustomerList from "./components/customerList";
import {
  calculateRewardPoints,
  getFilteredTransactions,
  getRecentThreeMonthsTransactions,
} from "./utils/rewardUtils";
import Filters from "./components/filters";
import { CenterWrapper, ErrorMessage } from "./styles/commonStyles";
import RewardsSummary from "./components/rewardsSummary";
import TransactionTable from "./components/transactionTable";
import LoadingSpinner from "./components/loadingSpinner";

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
    setFilters({ month: "", year: "" });
    setUseRecent3Months(true);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setUseRecent3Months(false);
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
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
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
