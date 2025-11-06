const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    ref: 'Student'
  },
  studentName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash', 'Card', 'Bank Transfer', 'Online']
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Paid', 'Overdue']
  },
  transactionId: {
    type: String,
    unique: true
  },
  academicYear: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Fee', feeSchema);