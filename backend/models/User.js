import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const schema=new mongoose.Schema({
 name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true,trim:true},
 password:{type:String,required:true,minlength:8,select:false}, role:{type:String,enum:['user','admin'],default:'user'},
 theme:{type:String,enum:['dark-arena','champion-gold','red-bloodline'],default:'dark-arena'}, avatar:{type:String,default:''},
 favorites:[{type:mongoose.Schema.Types.ObjectId,ref:'Fighter'}],
 recentActivity:[{label:String,at:{type:Date,default:Date.now}}]
},{timestamps:true});
schema.pre('save',async function(next){ if(this.isModified('password')) this.password=await bcrypt.hash(this.password,12); next();});
schema.methods.matchPassword=function(p){return bcrypt.compare(p,this.password)};
export default mongoose.model('User',schema);
