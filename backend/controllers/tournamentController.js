import Tournament from '../models/Tournament.js';
import Registration from '../models/Registration.js';
import Payment from '../models/Payment.js';
import { ok, fail } from '../utils/sendResponse.js';
export async function getTournaments(req,res,next){try{ok(res,{tournaments:await Tournament.find(req.query.status?{status:req.query.status}:{}).populate('fighters').sort('date')})}catch(e){next(e)}}
export async function getTournament(req,res,next){try{const tournament=await Tournament.findById(req.params.id).populate('fighters'); if(!tournament)return fail(res,'Tournament not found',404);ok(res,{tournament})}catch(e){next(e)}}
export async function createTournament(req,res,next){try{ok(res,{tournament:await Tournament.create(req.body)},'Tournament created',201)}catch(e){next(e)}}
export async function updateTournament(req,res,next){try{ok(res,{tournament:await Tournament.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})},'Tournament updated')}catch(e){next(e)}}
export async function deleteTournament(req,res,next){try{await Tournament.findByIdAndDelete(req.params.id);ok(res,{},'Tournament deleted')}catch(e){next(e)}}
export async function registerTournament(req,res,next){try{const tournament=await Tournament.findById(req.params.id); if(!tournament)return fail(res,'Tournament not found',404); if(tournament.seats<=0)return fail(res,'No seats available',409); const payment=await Payment.create({user:req.user?._id,amount:tournament.fee,status:req.body.paymentStatus||'pending',metadata:{tournament:tournament._id.toString()}}); const registration=await Registration.create({user:req.user?._id,tournament:tournament._id,payment:payment._id,name:req.body.name,email:req.body.email,age:req.body.age,seatType:req.body.seatType,notes:req.body.notes}); ok(res,{registration,payment},'Registration submitted for admin approval',201)}catch(e){next(e)}}
export async function getRegistrations(req,res,next){try{ok(res,{registrations:await Registration.find().populate('user tournament payment').sort('-createdAt')})}catch(e){next(e)}}
export async function updateRegistration(req,res,next){try{const registration=await Registration.findByIdAndUpdate(req.params.registrationId,req.body,{new:true,runValidators:true});ok(res,{registration},'Registration updated')}catch(e){next(e)}}
