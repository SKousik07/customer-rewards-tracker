import React from "react";
import PropTypes from "prop-types";
import {
  StyledTable,
  StyledTh,
  StyledTd,
  StyledTr,
  TableContainer,
  TableHeading,
} from "../styles/customerTableStyles";

function CustomerList({ customers, selectedCustomer, onChange }) {
  return (
    <>
      <TableHeading>All Customers</TableHeading>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Customer Name</StyledTh>
              <StyledTh>Total Rewards</StyledTh>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <StyledTr
                key={customer.customerId}
                selected={selectedCustomer.customerId === customer.customerId}
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
  customers: PropTypes.array.isRequired,
  selectedCustomer: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomerList;
