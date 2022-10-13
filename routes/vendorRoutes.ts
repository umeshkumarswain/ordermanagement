import express, { request, response, NextFunction } from 'express';
import { Addfood, getVendorProfile, updateVendorProfile, updateVendorService, vendorLogin } from '../controllers';
import { Authenticate } from '../middlewares';


const router = express.Router();

router.post('/login', vendorLogin)


router.get('/profile',Authenticate, getVendorProfile)
router.post('/profile',Authenticate, updateVendorProfile)
router.post('/service',Authenticate, updateVendorService)

router.post('/food',Addfood)
router.post('/foods')


export { router as VendorRoutes };