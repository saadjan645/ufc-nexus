import Leaderboard from '../models/Leaderboard.js';
import { list,getOne,createOne,updateOne,deleteOne } from './crudFactory.js';
export const getLeaderboard=async(req,res,next)=>{req.query.sort='-score';return list(Leaderboard,'leaderboard','fighter')(req,res,next)};
export const getLeaderboardRow=getOne(Leaderboard,'row','fighter');
export const createLeaderboard=createOne(Leaderboard,'row');
export const updateLeaderboard=updateOne(Leaderboard,'row');
export const deleteLeaderboard=deleteOne(Leaderboard);
