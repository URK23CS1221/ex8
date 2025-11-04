const express=require('express');
const router=express.Router();
const Student=require('../models/Student');
const auth=require('../middleware/auth');
const Joi=require('joi');

router.post('/',auth,async(req,res)=>{
  const schema=Joi.object({studentId:Joi.string().required(),name:Joi.string().required(),class:Joi.string().required(),parentContact:Joi.string().allow(''),email:Joi.string().email().allow(''),totalFee:Joi.number().min(0)});
  const {error,value}=schema.validate(req.body);
  if(error)return res.status(400).json({error:error.message});
  try{const s=new Student(value);await s.save();res.status(201).json(s);}catch(e){res.status(400).json({error:e.message});}
});

router.get('/',auth,async(req,res)=>{
  const {q,page=1,limit=25}=req.query;
  const filter=q?{$or:[{name:new RegExp(q,'i')},{studentId:new RegExp(q,'i')}] }:{};
  const s=await Student.find(filter).skip((page-1)*limit).limit(Number(limit)).sort({createdAt:-1});
  res.json(s);
});
module.exports=router;
