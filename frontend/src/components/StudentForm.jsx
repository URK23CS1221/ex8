import React, { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';

const StudentForm = ({ student, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    grade: '',
    section: '',
    parentName: '',
    contactNumber: '',
    email: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (student) {
        await studentAPI.update(student._id, formData);
      } else {
        await studentAPI.create(formData);
      }
      onSave();
      setFormData({
        studentId: '',
        name: '',
        grade: '',
        section: '',
        parentName: '',
        contactNumber: '',
        email: '',
        address: ''
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h3>{student ? 'Edit Student' : 'Add New Student'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Student ID:</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              disabled={!!student}
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Grade:</label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            >
              <option value="">Select Grade</option>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Section:</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
            >
              <option value="">Select Section</option>
              {['A', 'B', 'C', 'D'].map(section => (
                <option key={section} value={section}>Section {section}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Parent Name:</label>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group full-width">
            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (student ? 'Update' : 'Add')} Student
          </button>
          {student && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;