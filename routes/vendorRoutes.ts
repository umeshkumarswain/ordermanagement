import express, { request, response, NextFunction } from 'express';
import { getVendorProfile, updateVendorProfile, updateVendorService, vendorLogin } from '../controllers';
import { Authenticate } from '../middlewares';


const router = express.Router();

router.post('/login', vendorLogin)

router.get('/profile', Authenticate,getVendorProfile)
router.post('/profile', updateVendorProfile)
router.post('/service', updateVendorService)



export { router as VendorRoutes };