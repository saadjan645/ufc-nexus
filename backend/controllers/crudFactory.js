import { ok, fail } from '../utils/sendResponse.js';
export const list=(Model,key,pop='')=>async(req,res,next)=>{try{let q={}; if(req.query.search) q.$text={$search:req.query.search}; let docs=Model.find(q).sort(req.query.sort||'-createdAt'); if(pop) docs=docs.populate(pop); ok(res,{[key]:await docs});}catch(e){next(e)}};
export const getOne=(Model,key,pop='')=>async(req,res,next)=>{try{let q=Model.findById(req.params.id); if(pop) q=q.populate(pop); const doc=await q; if(!doc)return fail(res,'Not found',404); ok(res,{[key]:doc});}catch(e){next(e)}};
export const createOne=(Model,key)=>async(req,res,next)=>{try{const doc=await Model.create(req.body); ok(res,{[key]:doc},'Created',201);}catch(e){next(e)}};
export const updateOne=(Model,key)=>async(req,res,next)=>{try{const doc=await Model.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}); if(!doc)return fail(res,'Not found',404); ok(res,{[key]:doc},'Updated');}catch(e){next(e)}};
export const deleteOne=Model=>async(req,res,next)=>{try{const doc=await Model.findByIdAndDelete(req.params.id); if(!doc)return fail(res,'Not found',404); ok(res,{},'Deleted');}catch(e){next(e)}};
