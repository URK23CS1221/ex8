import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import FeeForm from './components/FeeForm';
import FeeList from './components/FeeList';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('students');
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingFee, setEditingFee] = useState(null);

  const handleStudentSave = () => {
    setEditingStudent(null);
  };

  const handleFeeSave = () => {
    setEditingFee(null);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setEditingFee(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>School Fee Payment and Management Portal</h1>
      </header>
      
      <nav className="tabs">
        <button 
          className={activeTab === 'students' ? 'active' : ''}
          onClick={() => setActiveTab('students')}
        >
          Students Management
        </button>
        <button 
          className={activeTab === 'fees' ? 'active' : ''}
          onClick={() => setActiveTab('fees')}
        >
          Fee Payments
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'students' && (
          <div className="tab-content">
            <div className="content-section">
              <StudentForm 
                student={editingStudent}
                onSave={handleStudentSave}
                onCancel={handleCancelEdit}
              />
            </div>
            <div className="content-section">
              <StudentList onEditStudent={setEditingStudent} />
            </div>
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="tab-content">
            <div className="content-section">
              <FeeForm 
                fee={editingFee}
                onSave={handleFeeSave}
                onCancel={handleCancelEdit}
              />
            </div>
            <div className="content-section">
              <FeeList onEditFee={setEditingFee} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;