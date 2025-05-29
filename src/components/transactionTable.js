import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { calculateRewardPoints } from "../utils/rewardUtils";
import {
  TableContainer,
  StyledTable,
  StyledTh,
  StyledTd,
  StyledTr,
  TableHeading,
  PaginationContainer,
  PaginationButton,
  NoDataText,
} from "../styles/transactionTableStyles";

const ITEMS_PER_PAGE = 5;

const TransactionTable = ({ filteredTransactions }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredTransactions]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const paginatedData = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <TableContainer>
      <TableHeading>Transaction Details</TableHeading>

      {filteredTransactions.length === 0 ? (
        <NoDataText>No transactions found for the selected filters.</NoDataText>
      ) : (
        <>
          <StyledTable>
            <thead>
              <tr>
                <StyledTh>Transaction ID</StyledTh>
                <StyledTh>Date</StyledTh>
                <StyledTh>Amount ($)</StyledTh>
                <StyledTh>Reward Points</StyledTh>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((tx) => (
                <StyledTr key={tx.transactionId}>
                  <StyledTd>{tx.transactionId}</StyledTd>
                  <StyledTd>{new Date(tx.date).toLocaleDateString()}</StyledTd>
                  <StyledTd>{tx.amount.toFixed(2)}</StyledTd>
                  <StyledTd>{calculateRewardPoints(tx.amount)}</StyledTd>
                </StyledTr>
              ))}
            </tbody>
          </StyledTable>

          <PaginationContainer>
            <PaginationButton onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </PaginationButton>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <PaginationButton
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginationButton>
          </PaginationContainer>
        </>
      )}
    </TableContainer>
  );
};

TransactionTable.propTypes = {
  filteredTransactions: PropTypes.array.isRequired,
};

export default TransactionTable;
