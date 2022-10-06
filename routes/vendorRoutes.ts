import express, { request, response, NextFunction } from 'express';
import { vendorLogin } from '../controllers';


const router = express.Router();

router.post('/login', vendorLogin)



export { router as VendorRoutes };