const express=require('express');
const router=express.Router();
const User=require('../models/User');
const Joi=require('joi');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.post('/signup',async(req,res)=>{
  const schema=Joi.object({username:Joi.string().required(),password:Joi.string().required(),role:Joi.string().valid('admin','cashier').default('admin')});
  const {error,value}=schema.validate(req.body);
  if(error)return res.status(400).json({error:error.message});
  const hash=await bcrypt.hash(value.password,10);
  try{
    const u=new User({username:value.username,passwordHash:hash,role:value.role});
    await u.save();
    res.status(201).json({username:u.username,role:u.role});
  }catch(e){res.status(400).json({error:e.message});}
});

router.post('/login',async(req,res)=>{
  const schema=Joi.object({username:Joi.string().required(),password:Joi.string().required()});
  const {error,value}=schema.validate(req.body);
  if(error)return res.status(400).json({error:error.message});
  const u=await User.findOne({username:value.username});
  if(!u)return res.status(400).json({error:'invalid'});
  const ok=await bcrypt.compare(value.password,u.passwordHash);
  if(!ok)return res.status(400).json({error:'invalid'});
  const token=jwt.sign({id:u._id,username:u.username,role:u.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
  res.json({token});
});
module.exports=router;
