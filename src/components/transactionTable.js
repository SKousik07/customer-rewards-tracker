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
import {
  TABLE_HEADINGS,
  TABLE_MESSAGES,
  getPaginationLabel,
  PAGINATION_LIMIT,
  PAGINATION_LABELS,
} from "../constants";

const TransactionTable = ({ filteredTransactions }) => {
  const getInitialPage = () => 1;

  const [currentPage, setCurrentPage] = useState(getInitialPage());

  useEffect(() => {
    setCurrentPage(1);
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
