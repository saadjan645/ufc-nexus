import express from 'express';import {protect,adminOnly} from '../middleware/auth.js';import {analytics,activity,exportResource} from '../controllers/adminController.js';
const r=express.Router();r.use(protect,adminOnly);r.get('/analytics',analytics);r.get('/activity',activity);r.get('/export/:resource',exportResource);export default r;
