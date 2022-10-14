import express from 'express';
import { CustomerLogin, CustomerSignUp, CustomerVerify, EditCustomerProfile, GetCustomerProfile, RequestOTP } from '../controllers/customerController';
import { Authenticate } from '../middlewares';

const router = express.Router();

router.post('/signup', CustomerSignUp) 
router.post('/login', CustomerLogin) 
router.use(Authenticate)
router.patch('/verify', CustomerVerify) 
router.get('/otp', RequestOTP) 
router.get('/profile',GetCustomerProfile) 
router.patch('/profile',EditCustomerProfile ) 

export { router as customerRoutes };