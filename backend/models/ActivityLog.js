import mongoose from 'mongoose';
const schema=new mongoose.Schema({actor:{type:mongoose.Schema.Types.ObjectId,ref:'User'},action:String,resource:String,resourceId:String,meta:Object},{timestamps:true});
export default mongoose.model('ActivityLog',schema);
