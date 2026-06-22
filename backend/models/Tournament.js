import mongoose from 'mongoose';
const schema=new mongoose.Schema({
 title:{type:String,required:true}, subtitle:{type:String,default:''}, date:{type:Date,required:true}, location:{type:String,required:true},
 arena:{type:String,default:''}, fighters:[{type:mongoose.Schema.Types.ObjectId,ref:'Fighter'}], seats:{type:Number,required:true},
 fee:{type:Number,required:true}, status:{type:String,enum:['Upcoming','Live','Completed'],default:'Upcoming'}
},{timestamps:true});
export default mongoose.model('Tournament',schema);
