import React, { useState, useEffect } from 'react';
import { feeAPI } from '../services/api';

const FeeList = ({ onEditFee }) => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFees = async () => {
    try {
      const response = await feeAPI.getAll();
      setFees(response.data.data);
    } catch (error) {
      alert('Error loading fee payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this fee payment?')) {
      try {
        await feeAPI.delete(id);
        loadFees();
      } catch (error) {
        alert('Error deleting fee payment');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusClass = {
      'Paid': 'status-paid',
      'Pending': 'status-pending',
      'Overdue': 'status-overdue'
    }[status] || 'status-pending';
    
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div className="loading">Loading fee payments...</div>;

  return (
    <div className="list-container">
      <h3>Fee Payments</h3>
      {fees.length === 0 ? (
        <p>No fee payments found</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr key={fee._id}>
                  <td>{fee.transactionId}</td>
                  <td>{fee.studentId}</td>
                  <td>{fee.studentName}</td>
                  <td>₹{fee.amount}</td>
                  <td>{formatDate(fee.paymentDate)}</td>
                  <td>{formatDate(fee.dueDate)}</td>
                  <td>{getStatusBadge(fee.status)}</td>
                  <td>{fee.paymentMethod}</td>
                  <td className="actions">
                    <button 
                      onClick={() => onEditFee(fee)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(fee._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeeList;