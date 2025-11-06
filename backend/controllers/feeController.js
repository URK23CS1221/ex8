const Fee = require('../models/Fee');
const Student = require('../models/Student');

// Create new fee payment
const createFee = async (req, res) => {
  try {
    // Generate transaction ID
    const transactionId = 'TXN' + Date.now();
    req.body.transactionId = transactionId;

    const fee = new Fee(req.body);
    await fee.save();

    // Update fee status to Paid if payment date is today or before due date
    const today = new Date();
    if (fee.paymentDate <= fee.dueDate && fee.status === 'Pending') {
      fee.status = 'Paid';
      await fee.save();
    }

    res.status(201).json({
      success: true,
      data: fee,
      message: 'Fee payment recorded successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all fee payments
const getFees = async (req, res) => {
  try {
    const fees = await Fee.find().sort({ paymentDate: -1 });
    res.status(200).json({
      success: true,
      data: fees,
      count: fees.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get fee by ID
const getFeeById = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }
    res.status(200).json({
      success: true,
      data: fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update fee payment
const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }
    res.status(200).json({
      success: true,
      data: fee,
      message: 'Fee payment updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete fee payment
const deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);
    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Fee payment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get fees by student ID
const getFeesByStudentId = async (req, res) => {
  try {
    const fees = await Fee.find({ studentId: req.params.studentId }).sort({ paymentDate: -1 });
    res.status(200).json({
      success: true,
      data: fees,
      count: fees.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createFee,
  getFees,
  getFeeById,
  updateFee,
  deleteFee,
  getFeesByStudentId
};