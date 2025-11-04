const express=require('express');
const router=express.Router();
const Payment=require('../models/Payment');
const Student=require('../models/Student');
const auth=require('../middleware/auth');
const Joi=require('joi');
const mongoose=require('mongoose');

router.post('/',auth,async(req,res)=>{
  const schema=Joi.object({studentId:Joi.string().required(),amount:Joi.number().positive().required(),method:Joi.string().valid('cash','card','online','cheque').required(),reference:Joi.string().allow(''),receivedBy:Joi.string().required()});
  const {error,value}=schema.validate(req.body);
  if(error)return res.status(400).json({error:error.message});
  const session=await mongoose.startSession();
  session.startTransaction();
  try{
    const student=await Student.findOne({studentId:value.studentId}).session(session);
    if(!student)throw new Error('Student not found');
    const p=new Payment({student:student._id,amount:value.amount,method:value.method,reference:value.reference,receivedBy:value.receivedBy});
    await p.save({session});
    await session.commitTransaction();session.endSession();
    await p.populate('student','studentId name class');
    res.status(201).json(p);
  }catch(e){await session.abortTransaction();session.endSession();res.status(400).json({error:e.message});}
});

router.get('/',auth,async(req,res)=>{
  const {studentId,page=1,limit=25}=req.query;
  const filter={};
  if(studentId){
    const st=await Student.findOne({studentId});
    if(!st)return res.json([]);
    filter.student=st._id;
  }
  const pay=await Payment.find(filter).populate('student','studentId name class').skip((page-1)*limit).limit(Number(limit)).sort({createdAt:-1});
  res.json(pay);
});

router.delete('/:id',auth,async(req,res)=>{
  if(req.user.role!=='admin')return res.status(403).json({error:'forbidden'});
  const r=await Payment.findByIdAndDelete(req.params.id);
  if(!r)return res.status(404).json({error:'not found'});
  res.json({success:true});
});
module.exports=router;
