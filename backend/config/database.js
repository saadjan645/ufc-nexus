import mongoose from 'mongoose';
export async function connectDatabase(){
  try{
    const uri=process.env.MONGO_URI||'mongodb://127.0.0.1:27017/ufc-nexus';
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  }catch(e){console.error('MongoDB failed:',e.message);process.exit(1);}
}
