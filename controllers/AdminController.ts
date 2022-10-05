import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { vendor } from "../models";

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput> req.body;
    const createdVendor = await vendor.create({
        name: name, address: address, pincode: pincode, foodType: foodType, email: email, password: password, ownerName: ownerName, phone: phone,rating:0,salt:'12312afeafew',serviceAvailable:false,coverImage:[]
    });

    return res.json(createdVendor);
}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {

}

export const GetVendorsById = async (req: Request, res: Response, next: NextFunction) => {

}