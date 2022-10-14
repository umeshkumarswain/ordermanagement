import express from 'express';
import multer from 'multer';
import { Addfood, GetFoods, getVendorProfile, updateVendorCoverImage, updateVendorProfile, updateVendorService, vendorLogin } from '../controllers';
import { Authenticate } from '../middlewares';


const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'images')
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g, '-')+'_'+file.originalname)
    },
});

const images = multer({storage:imageStorage}).array('images',10);

router.post('/login', vendorLogin)

router.use(Authenticate);
router.get('/profile', getVendorProfile)
router.patch('/profile', updateVendorProfile)
router.patch('/coverimage',images, updateVendorCoverImage)
router.post('/service', updateVendorService)

router.post('/food',images,Addfood)
router.get('/foods',GetFoods)


export { router as VendorRoutes };