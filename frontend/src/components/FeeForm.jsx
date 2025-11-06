import React, { useState, useEffect } from 'react';
import { feeAPI, studentAPI } from '../services/api';

const FeeForm = ({ fee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    amount: '',
    dueDate: '',
    paymentMethod: 'Cash',
    academicYear: '2024-2025',
    month: new Date().toLocaleString('default', { month: 'long' })
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    if (fee) {
      setFormData({
        ...fee,
        dueDate: fee.dueDate ? fee.dueDate.split('T')[0] : '',
        amount: fee.amount.toString()
      });
    }
  }, [fee]);

  const loadStudents = async () => {
    try {
      const response = await studentAPI.getAll();
      setStudents(response.data.data);
    } catch (error) {
      alert('Error loading students');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'studentId') {
      const selectedStudent = students.find(s => s.studentId === value);
      setFormData({
        ...formData,
        studentId: value,
        studentName: selectedStudent ? selectedStudent.name : ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = {
        ...formData,
        amount: parseFloat(formData.amount),
        dueDate: new Date(formData.dueDate)
      };

      if (fee) {
        await feeAPI.update(fee._id, submitData);
      } else {
        await feeAPI.create(submitData);
      }
      onSave();
      setFormData({
        studentId: '',
        studentName: '',
        amount: '',
        dueDate: '',
        paymentMethod: 'Cash',
        academicYear: '2024-2025',
        month: new Date().toLocaleString('default', { month: 'long' })
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving fee payment');
    } finally {
      setLoading(false);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="form-container">
      <h3>{fee ? 'Edit Fee Payment' : 'Record Fee Payment'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Student:</label>
            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              disabled={!!fee}
            >
              <option value="">Select Student</option>
              {students.map(student => (
                <option key={student._id} value={student.studentId}>
                  {student.studentId} - {student.name} (Grade {student.grade})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Student Name:</label>
            <input
              type="text"
              value={formData.studentName}
              readOnly
              className="readonly"
            />
          </div>
          <div className="form-group">
            <label>Amount (₹):</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Payment Method:</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Online">Online</option>
            </select>
          </div>
          <div className="form-group">
            <label>Academic Year:</label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              required
            >
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </div>
          <div className="form-group">
            <label>Month:</label>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
            >
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (fee ? 'Update' : 'Record')} Payment
          </button>
          {fee && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FeeForm;