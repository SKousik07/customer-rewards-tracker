import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { calculateRewardPoints } from "../utils/rewardUtils";
import {
  NoDataText,
  SummaryContainer,
  SummaryItem,
  Title,
  TotalSummaryItem,
} from "../styles/rewardsSummaryStyles";
import { REWARDS_LABELS } from "../constants";

const getRewardsPerMonth = (transactions) => {
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
  const monthlySummary = useMemo(
    () => getRewardsPerMonth(filteredTransactions),
    [filteredTransactions]
  );

  const total = useMemo(
    () => Object.values(monthlySummary).reduce((sum, val) => sum + val, 0),
    [monthlySummary]
  );

  if (!selectedCustomer) return null;

  return (
    <SummaryContainer>
      <Title>
        {REWARDS_LABELS.TITLE_PREFIX}
        {selectedCustomer.customerName}
      </Title>

      {filteredTransactions.length === 0 ? (
        <NoDataText>{REWARDS_LABELS.NO_TRANSACTIONS}</NoDataText>
      ) : (
        <>
          {Object.entries(monthlySummary).map(([month, points]) => (
            <SummaryItem key={month}>
              <span>{month}</span>
              <span>
                {points} {REWARDS_LABELS.POINTS_SUFFIX}
              </span>
            </SummaryItem>
          ))}
          <TotalSummaryItem>
            <span>{REWARDS_LABELS.TOTAL}</span>
            <span>
              {total} {REWARDS_LABELS.POINTS_SUFFIX}
            </span>
          </TotalSummaryItem>
        </>
      )}
    </SummaryContainer>
  );
};

RewardsSummary.propTypes = {
  filteredTransactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedCustomer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
  }),
};

export default RewardsSummary;
