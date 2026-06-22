import ActivityLog from '../models/ActivityLog.js';
export const logActivity=(action,resource)=>async(req,res,next)=>{try{await ActivityLog.create({actor:req.user?._id,action,resource,resourceId:req.params.id||'',meta:{method:req.method,path:req.originalUrl}})}catch(e){} next();};
