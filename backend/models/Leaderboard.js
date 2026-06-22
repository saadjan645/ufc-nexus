import mongoose from 'mongoose';
const schema=new mongoose.Schema({
 fighter:{type:mongoose.Schema.Types.ObjectId,ref:'Fighter',required:true}, score:{type:Number,default:0}, weightClass:{type:String,required:true},
 wins:{type:Number,default:0}, ko:{type:Number,default:0}, submissions:{type:Number,default:0}, accuracy:{type:Number,default:50},
 movement:{type:String,enum:['up','down','same'],default:'same'}
},{timestamps:true});
export default mongoose.model('Leaderboard',schema);
