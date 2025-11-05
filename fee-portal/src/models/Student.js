const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  contact: { type: String },
  parentName: { type: String },
  totalFee: { type: Number, required: true },
  paidFee: { type: Number, default: 0 }
}, { timestamps: true });

studentSchema.virtual('dueFee').get(function () {
  return this.totalFee - this.paidFee;
});

// Ensure virtuals are serialized
studentSchema.set('toJSON', { virtuals: true });
studentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Student', studentSchema);