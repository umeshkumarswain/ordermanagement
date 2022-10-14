import express, { Request, Response, NextFunction } from 'express';
import { GetFoodAvailability, GetFoodsIn30Min, GetTopRestaurants, RestaturantById, SearchFoods } from '../controllers';

const router = express.Router();

router.get('/:pincode', GetFoodAvailability) //Food availibility
router.get('/top-restaturants/:pincode', GetTopRestaurants) // Top resturants
router.get('/foods-in-30-min/:pincode', GetFoodsIn30Min) //Food available in 30 mins
router.get('/search/:pincode', SearchFoods) // Search foods
router.get('/restaturant/:id', RestaturantById) // Find restaurant by id


export { router as ShoppingRoute };