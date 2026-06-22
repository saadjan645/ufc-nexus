import mongoose from 'mongoose';
const schema=new mongoose.Schema({
 name:{type:String,required:true,trim:true,unique:true}, division:{type:String,required:true}, country:{type:String,required:true},
 image:{type:String,default:''}, wins:{type:Number,default:0}, losses:{type:Number,default:0}, ko:{type:Number,default:0},
 submissions:{type:Number,default:0}, reach:{type:String,default:'—'}, weight:{type:String,default:'—'}, rank:{type:Number,default:99},
 accuracy:{type:Number,default:50}, champion:{type:Boolean,default:false}, status:{type:String,enum:['Active','Retired'],default:'Active'},
 bio:{type:String,default:''}, style:{type:String,default:'Mixed Martial Arts'}
},{timestamps:true});
schema.index({name:'text',division:'text',country:'text'});
export default mongoose.model('Fighter',schema);
