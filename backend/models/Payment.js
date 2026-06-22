import mongoose from 'mongoose';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},amount:{type:Number,required:true},currency:{type:String,default:'usd'},status:{type:String,enum:['pending','paid','failed','refunded','mock_paid'],default:'pending'},provider:{type:String,default:'stripe'},stripeSessionId:{type:String,default:''},metadata:{type:Object,default:{}}},{timestamps:true});
export default mongoose.model('Payment',schema);
