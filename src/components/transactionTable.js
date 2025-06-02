import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { calculateRewardPoints } from "../utils/rewardUtils";
import {
  NoDataText,
  PaginationButton,
  PaginationContainer,
  StyledTable,
  StyledTd,
  StyledTh,
  StyledTr,
  TableContainer,
  TableHeading,
} from "../styles/transactionTableStyles";
import {
  getPaginationLabel,
  PAGINATION_LABELS,
  PAGINATION_LIMIT,
  TABLE_HEADINGS,
  TABLE_MESSAGES,
} from "../constants";

const INITIAL_PAGE = 1;

const TransactionTable = ({ filteredTransactions }) => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  useEffect(() => {
    setCurrentPage(INITIAL_PAGE);
  }, [filteredTransactions]);

  const totalPages = Math.ceil(filteredTransactions.length / PAGINATION_LIMIT);

  const paginatedData = filteredTransactions.slice(
    (currentPage - 1) * PAGINATION_LIMIT,
    currentPage * PAGINATION_LIMIT
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <TableContainer>
      <TableHeading>{TABLE_MESSAGES.HEADING}</TableHeading>

      {filteredTransactions.length === 0 ? (
        <NoDataText>{TABLE_MESSAGES.NO_DATA}</NoDataText>
      ) : (
        <>
          <StyledTable>
            <thead>
              <tr>
                {TABLE_HEADINGS.map((heading, i) => (
                  <StyledTh key={i}>{heading}</StyledTh>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((transaction) => (
                <StyledTr key={transaction.transactionId}>
                  <StyledTd>{transaction.transactionId}</StyledTd>
                  <StyledTd>
                    {new Date(transaction.date).toLocaleDateString()}
                  </StyledTd>
                  <StyledTd>{transaction.amount.toFixed(2)}</StyledTd>
                  <StyledTd>
                    {calculateRewardPoints(transaction.amount)}
                  </StyledTd>
                </StyledTr>
              ))}
            </tbody>
          </StyledTable>

          <PaginationContainer>
            <PaginationButton onClick={handlePrev} disabled={currentPage === 1}>
              {PAGINATION_LABELS.PREVIOUS}
            </PaginationButton>
            <span>{getPaginationLabel(currentPage, totalPages)}</span>
            <PaginationButton
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              {PAGINATION_LABELS.NEXT}
            </PaginationButton>
          </PaginationContainer>
        </>
      )}
    </TableContainer>
  );
};

TransactionTable.propTypes = {
  filteredTransactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionTable;
