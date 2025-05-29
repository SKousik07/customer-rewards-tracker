import React from "react";
import PropTypes from "prop-types";
import { calculateRewardPoints } from "../utils/rewardUtils";
import {
  NoDataText,
  SummaryContainer,
  SummaryItem,
  Title,
} from "../styles/rewardsSummaryStyles";

const rewardsPerMonth = (transactions) => {
  const summary = {};

  transactions.forEach((txn) => {
    const date = new Date(txn.date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!summary[key]) {
      summary[key] = 0;
    }

    summary[key] += calculateRewardPoints(txn.amount);
  });

  return summary;
};

const RewardsSummary = ({ filteredTransactions, selectedCustomer }) => {
  const monthlySummary = rewardsPerMonth(filteredTransactions);
  const total = Object.values(monthlySummary).reduce(
    (sum, val) => sum + val,
    0
  );

  if (!selectedCustomer) return null;

  return (
    <SummaryContainer>
      <Title>Rewards Summary - {selectedCustomer.customerName}</Title>
      {filteredTransactions.length === 0 ? (
        <NoDataText>No transactions found for the selected filters.</NoDataText>
      ) : (
        <>
          {Object.entries(monthlySummary).map(([month, points]) => (
            <SummaryItem key={month}>
              <span>{month}</span>
              <span>{points} points</span>
            </SummaryItem>
          ))}
          <SummaryItem
            style={{
              fontWeight: "bold",
              borderTop: "1px solid #ddd",
              paddingTop: "10px",
            }}
          >
            <span>Total</span>
            <span>{total} points</span>
          </SummaryItem>
        </>
      )}
    </SummaryContainer>
  );
};

RewardsSummary.propTypes = {
  filteredTransactions: PropTypes.array.isRequired,
  selectedCustomer: PropTypes.object,
};

export default RewardsSummary;
