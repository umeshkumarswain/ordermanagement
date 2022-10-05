import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput> req.body;
    
    const existingVendor = await vendor.findOne({ email: email });
    if (existingVendor !== null) {
        return res.json({"message":`A vendor with email ${email} already exist.`})
    }
   
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const createdVendor = await vendor.create({
        name: name, address: address, pincode: pincode, foodType: foodType, email: email, password: userPassword, ownerName: ownerName, phone: phone, rating: 0, salt: salt,serviceAvailable:false,coverImage:[]
    });

    return res.json(createdVendor);
}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {

}

export const GetVendorsById = async (req: Request, res: Response, next: NextFunction) => {

}