import { fail } from '../utils/sendResponse.js';
export const requireFields=(...fields)=>(req,res,next)=>{const m=fields.filter(f=>!req.body[f]); return m.length?fail(res,`Missing required fields: ${m.join(', ')}`,400):next();};
export const validateEmail=(req,res,next)=> req.body.email && !/^\S+@\S+\.\S+$/.test(req.body.email) ? fail(res,'Invalid email',400) : next();
