import Contact from '../models/Contact.js';
import { list,updateOne,deleteOne } from './crudFactory.js';
import { ok } from '../utils/sendResponse.js';
export async function submitContact(req,res,next){try{ok(res,{contact:await Contact.create(req.body)},'Message received',201)}catch(e){next(e)}}
export const getContacts=list(Contact,'contacts');
export const updateContact=updateOne(Contact,'contact');
export const deleteContact=deleteOne(Contact);
