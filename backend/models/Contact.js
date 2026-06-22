import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},email:{type:String,required:true,lowercase:true},phone:{type:String,default:''},message:{type:String,required:true,minlength:10},status:{type:String,default:'New'}},{timestamps:true});
export default mongoose.model('Contact',schema);
