const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  studentId: { type: String, required: true }, // string like "S001"
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  paymentMethod: { type: String, enum: ['cash', 'card', 'online', 'cheque'], default: 'cash' },
  reference: { type: String }, // your "receiptNo" → now "reference"
  receivedBy: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);