import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { fail } from '../utils/sendResponse.js';
export async function protect(req,res,next){
 try{let token=(req.headers.authorization||'').startsWith('Bearer ')?req.headers.authorization.split(' ')[1]:req.cookies?.token;
 if(!token)return fail(res,'Authentication required',401);
 const decoded=jwt.verify(token,process.env.JWT_SECRET||'dev_secret');
 const user=await User.findById(decoded.id).select('-password').populate('favorites');
 if(!user)return fail(res,'User not found',401); req.user=user; next();}
 catch(e){return fail(res,'Invalid or expired token',401);}
}
export const adminOnly=(req,res,next)=>req.user?.role==='admin'?next():fail(res,'Admin access required',403);
export async function optionalAuth(req,res,next){try{const h=req.headers.authorization||'';if(h.startsWith('Bearer ')){const d=jwt.verify(h.split(' ')[1],process.env.JWT_SECRET||'dev_secret');req.user=await User.findById(d.id).select('-password');}}catch(e){} next();}
