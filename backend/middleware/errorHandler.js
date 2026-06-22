import { fail } from '../utils/sendResponse.js';
export const notFound=(req,res)=>fail(res,`Route not found: ${req.originalUrl}`,404);
export function errorHandler(err,req,res,next){console.error(err); if(err.name==='ValidationError')return fail(res,'Validation failed',400,Object.values(err.errors).map(e=>e.message)); if(err.code===11000)return fail(res,'Duplicate record',409,err.keyValue); return fail(res,err.message||'Server error',err.statusCode||500);}
