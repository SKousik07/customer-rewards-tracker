import React from "react";
import PropTypes from "prop-types";

import { CUSTOMER_TABLE_LABELS } from "../constants";
import {
  StyledTable,
  StyledTd,
  StyledTh,
  StyledTr,
  TableContainer,
  TableHeading,
} from "../styles/customerTableStyles";

function CustomerList({ customers, selectedCustomer, onChange }) {
  return (
    <>
      <TableHeading>{CUSTOMER_TABLE_LABELS.HEADING}</TableHeading>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>{CUSTOMER_TABLE_LABELS.NAME_HEADER}</StyledTh>
              <StyledTh>{CUSTOMER_TABLE_LABELS.REWARDS_HEADER}</StyledTh>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <StyledTr
                key={customer.customerId}
                selected={selectedCustomer?.customerId === customer?.customerId}
                onClick={() => onChange(customer)}
              >
                <StyledTd>{customer.customerName}</StyledTd>
                <StyledTd>{customer.totalRewards}</StyledTd>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </>
  );
}

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      totalRewards: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedCustomer: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    totalRewards: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomerList;
