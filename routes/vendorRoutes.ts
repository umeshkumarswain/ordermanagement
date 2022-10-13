import express from 'express';
import { Addfood, GetFoods, getVendorProfile, updateVendorProfile, updateVendorService, vendorLogin } from '../controllers';
import { Authenticate } from '../middlewares';


const router = express.Router();

router.post('/login', vendorLogin)

router.use(Authenticate);
router.get('/profile', getVendorProfile)
router.patch('/profile', updateVendorProfile)
router.post('/service', updateVendorService)

router.post('/food',Addfood)
router.post('/foods',GetFoods)


export { router as VendorRoutes };