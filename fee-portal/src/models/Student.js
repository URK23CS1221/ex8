const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
  studentId:{type:String,required:true,unique:true},
  name:{type:String,required:true},
  class:{type:String,required:true},
  parentContact:String,
  email:String,
  totalFee:{type:Number,default:0},
  createdAt:{type:Date,default:Date.now}
});
module.exports = mongoose.model('Student',StudentSchema);
