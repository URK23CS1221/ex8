import React, { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';

const StudentList = ({ onEditStudent }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStudents = async () => {
    try {
      const response = await studentAPI.getAll();
      setStudents(response.data.data);
    } catch (error) {
      alert('Error loading students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentAPI.delete(id);
        loadStudents();
      } catch (error) {
        alert('Error deleting student');
      }
    }
  };

  if (loading) return <div className="loading">Loading students...</div>;

  return (
    <div className="list-container">
      <h3>Student List</h3>
      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Grade</th>
                <th>Section</th>
                <th>Parent Name</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>Grade {student.grade}</td>
                  <td>Section {student.section}</td>
                  <td>{student.parentName}</td>
                  <td>{student.contactNumber}</td>
                  <td className="actions">
                    <button 
                      onClick={() => onEditStudent(student)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(student._id)}
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

export default StudentList;