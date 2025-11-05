const Payment = require('../models/Payment');
const Student = require('../models/Student');

const makePayment = async (req, res) => {
  try {
    const { studentId, amount, paymentMethod, reference, receivedBy } = req.body;

    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    const payment = new Payment({ studentId, amount, paymentMethod, reference, receivedBy });
    await payment.save();

    student.paidFee += amount;
    await student.save();

    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPaymentsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const payments = await Payment.find({ studentId });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { makePayment, getPaymentsByStudent };