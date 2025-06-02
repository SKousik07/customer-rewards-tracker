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

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!summary[key]) {
      summary[key] = 0;
    }

    summary[key] += calculateRewardPoints(transaction.amount);
  });

  return summary;
};

const RewardsSummary = ({ filteredTransactions, selectedCustomer }) => {
  const monthlySummary = useMemo(() => {
    const summary = getRewardsPerMonth(filteredTransactions);

    const sortedEntries = Object.entries(summary).sort(
      ([monthA], [monthB]) =>
        new Date(`${monthA} 1, 2000`) - new Date(`${monthB} 1, 2000`)
    );

    return Object.fromEntries(sortedEntries);
  }, [filteredTransactions]);

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

      {filteredTransactions.length === 0 && (
        <NoDataText>{REWARDS_LABELS.NO_TRANSACTIONS}</NoDataText>
      )}

      {filteredTransactions.length > 0 && (
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
