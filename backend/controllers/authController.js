import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { ok, fail } from '../utils/sendResponse.js';
const cookie={httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:604800000};
const clean=u=>{const o=u.toObject?u.toObject():u; delete o.password; return o};
export async function signup(req,res,next){try{const {username,name,email,password,confirmPassword}=req.body;if(password!==confirmPassword)return fail(res,'Passwords do not match',400);const user=await User.create({name:name||username,email,password});const token=generateToken(user);req.session.userId=user._id.toString();res.cookie('token',token,cookie);ok(res,{token,user:clean(user)},'Account created',201)}catch(e){next(e)}}
export async function login(req,res,next){try{const user=await User.findOne({email:req.body.email}).select('+password');if(!user||!(await user.matchPassword(req.body.password)))return fail(res,'Invalid email or password',401);user.recentActivity.unshift({label:'Signed in'});await user.save();const token=generateToken(user);req.session.userId=user._id.toString();res.cookie('token',token,cookie);ok(res,{token,user:clean(user)},'Signed in')}catch(e){next(e)}}
export const logout=(req,res)=>{req.session.destroy(()=>{});res.clearCookie('token');ok(res,{},'Signed out')};
export const me=(req,res)=>ok(res,{user:req.user},'Current user');
export const forgotPassword=(req,res)=>ok(res,{resetTokenPreview:'DEMO-RESET-TOKEN'},'Reset workflow queued');
