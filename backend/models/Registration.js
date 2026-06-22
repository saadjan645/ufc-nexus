import mongoose from 'mongoose';
const schema=new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}, tournament:{type:mongoose.Schema.Types.ObjectId,ref:'Tournament',required:true},
 payment:{type:mongoose.Schema.Types.ObjectId,ref:'Payment'}, name:{type:String,required:true}, email:{type:String,required:true,lowercase:true},
 age:{type:Number,required:true,min:18}, seatType:{type:String,default:'Standard'},
 approvalStatus:{type:String,enum:['Pending','Approved','Rejected'],default:'Pending'}, notes:{type:String,default:''}
},{timestamps:true});
export default mongoose.model('Registration',schema);
