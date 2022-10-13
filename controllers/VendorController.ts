import { Request, Response, NextFunction } from "express";
import { EditVendorInput, VendorLoginInputs } from "../dto";
import { CreateFoodInputs } from "../dto/food.dto";
import { food } from "../models";
import { GenerateSignature, validatePassword } from "../utility";
import { findVendor } from "./AdminController";

export const vendorLogin = async (req:Request,res:Response,next:NextFunction) => {
    const { email, password } = <VendorLoginInputs> req.body;
    const existingVendor = await findVendor("", email);
    if (existingVendor != null) {
        const validation = await validatePassword(password, existingVendor.password, existingVendor.salt);
        if (validation) {
            const signature = await GenerateSignature({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodType: existingVendor.foodType,
                 name:existingVendor.name
            })
            return res.json(signature)
        }
        else {
            return res.json({ "message": "Invalid Password" })
        }
    }
    return res.json({"message":"Invalid Credentials"})
} 

export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVendor = await findVendor(user._id);
        return res.json(existingVendor);
    }
    return res.json({"message":"Vendor information not found."})
}

export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { name,address,phone,foodType} = <EditVendorInput> req.body;
    const user = req.user;
    if (user) {
        const existingVendor = await findVendor(user._id);
        if (existingVendor != null) {
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.phone = phone;
            const saveResult = await existingVendor.save();
            return res.json(saveResult);
        }
        return res.json(existingVendor);
    }
    return res.json({ "message": "Vendor information not found." })
}

export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; 
    if (user) {
        const existingVendor = await findVendor(user._id);
        if (existingVendor != null) {
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
            const saveResult = await existingVendor.save();
            return res.json(saveResult);
        }
        return res.json(existingVendor);
    }
    return res.json({ "message": "Vendor information not found." })
}

export const Addfood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; 
    if (user) {
       const {name,description,category,foodType,readyTime,price} = <CreateFoodInputs> req.body;
       const vendor =await findVendor(user._id);
        if(vendor != null){
            const createdFood = await food.create({
                vendorId: vendor._id,
                name:name,
                description:description,
                category:category,
                foodType:foodType,
                readyTime:readyTime,
                price:price,
                images:['mock.jpg'],
                rating:0
            });
            vendor.foods.push(createdFood);
            const result = await vendor.save();
            return res.json(result);
        }

    }
    return res.json({ "message": "Something went wrong with add food." })
}

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; 
    if (user) {
      const foods = await food.find({vendorId:user._id});
      if (foods != null) {
        return res.json(foods);
      }
    }
    return res.json({ "message": "Food information not found." })
}