const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Student = require('../models/Student');
const auth = require('../middleware/auth');
const Joi = require('joi');
const mongoose = require('mongoose');

// record payment
router.post('/', auth, async (req, res) => {
  const schema = Joi.object({
    studentId: Joi.string().required(),
    amount: Joi.number().positive().required(),
    method: Joi.string().valid('cash','card','online','cheque').required(),
    reference: Joi.string().allow(''),
    receivedBy: Joi.string().required()
  });
  const { error, value } = schema.validate(req.body);
  if(error) return res.status(400).json({ error: error.message });

  const session = await mongoose.startSession();
  session.startTransaction();
  try{
    const student = await Student.findOne({ studentId: value.studentId }).session(session);
    if(!student) throw new Error('Student not found');

    const payment = new Payment({
      student: student._id,
      amount: value.amount,
      method: value.method,
      reference: value.reference,
      receivedBy: value.receivedBy
    });

    await payment.save({ session });

    // optional: update student totalPaid or balance if you model it
    // example: student.totalPaid = (student.totalPaid || 0) + value.amount; await student.save({session});

    await session.commitTransaction();
    session.endSession();

    await payment.populate('student', 'studentId name class');
    res.status(201).json(payment);
  } catch(err){
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: err.message });
  }
});

// query payments
router.get('/', auth, async (req,res)=>{
  const { studentId, page=1, limit=25, from, to } = req.query;
  const filter = {};
  if(studentId){
    const student = await Student.findOne({ studentId });
    if(!student) return res.json([]);
    filter.student = student._id;
  }
  if(from || to){
    filter.createdAt = {};
    if(from) filter.createdAt.$gte = new Date(from);
    if(to) filter.createdAt.$lte = new Date(to);
  }
  const payments = await Payment.find(filter).populate('student','studentId name class')
    .skip((page-1)*limit).limit(Number(limit)).sort({createdAt:-1});
  res.json(payments);
});

// delete payment (admin only)
router.delete('/:id', auth, async (req,res)=>{
  if(req.user.role !== 'admin') return res.status(403).json({error:'forbidden'});
  const id = req.params.id;
  const p = await Payment.findByIdAndDelete(id);
  if(!p) return res.status(404).json({error:'not found'});
  res.json({ success: true });
});

module.exports = router;
