import React from 'react';
import { Link } from 'react-router-dom'

const CustomerDetailsDialog = ({ customerDetails }) => {
  return (
    <div className="customer-details-dialog">
      <h3>Customer Details</h3>
      <p>Email: {customerDetails.email}</p>
      <p>First Name: {customerDetails.firstName}</p>
      <p>Last Name: {customerDetails.lastName}</p>
      <Link>View more details</Link>
    </div>
  );
};

export default CustomerDetailsDialog;
