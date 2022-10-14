import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { FoodDoc, vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const GetFoodAvailability = async (req: Request, res: Response, next: NextFunction) => {
    const pinCode = req.params.pinCode;
    const result = await vendor.find({ pincode: pinCode, serviceAvailable: true })
        .sort([['rating', 'descending']])
        .populate('foods');
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ "message": "Data not found" });
}

export const GetTopRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    const pinCode = req.params.pinCode;
    const result = await vendor.find({ pincode: pinCode, serviceAvailable: true })
        .sort([['rating', 'descending']])
        .limit(1);
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ "message": "Data not found" });
}

export const GetFoodsIn30Min = async (req: Request, res: Response, next: NextFunction) => {
    const pinCode = req.params.pinCode;
    const result = await vendor.find({ pincode: pinCode, serviceAvailable: true })
        .populate('foods')
    if (result.length > 0) {
        let foodResult: any = [];
        result.map((vendor) => {
            const foods = vendor.foods as [FoodDoc];
            foodResult.push(...foods.filter(food => food.readyTime <= 30))
        })

        return res.status(200).json(foodResult);
    }
    return res.status(400).json({ "message": "Data not found" });
}

export const SearchFoods = async (req: Request, res: Response, next: NextFunction) => {
    const pinCode = req.params.pinCode;
    const result = await vendor.find({ pincode: pinCode, serviceAvailable: true })
        .populate('foods')
    if (result.length > 0) {
        let foodResult: any = [];
        result.map((vendor) => {
            foodResult.push(...vendor.foods)
        })
        return res.status(200).json(result);
    }
    return res.status(400).json({ "message": "Data not found" });
}

export const RestaturantById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await vendor.findById(id).populate('foods');
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ "message": "Data not found" });
}