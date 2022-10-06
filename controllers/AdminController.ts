import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const findVendor =async (id:string | undefined,email?:string) => {
    if (email) {
        return await vendor.findOne({ email: email });
    }
    else {
        return await vendor.findById(id);
    }
}


export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorInput> req.body;

    const existingVendor = await findVendor('',email);
    if (existingVendor !== null) {
        return res.json({ "message": `A vendor with email ${email} already exist.` })
    }

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const createdVendor = await vendor.create({
        name: name, address: address, pincode: pincode, foodType: foodType, email: email, password: userPassword, ownerName: ownerName, phone: phone, rating: 0, salt: salt, serviceAvailable: false, coverImage: []
    });

    return res.json(createdVendor);
}

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
    const vendors = await vendor.find();
    if (vendors != null) {
        return res.json(vendors);
    }
    return res.json({ "message": 'vendor data not availble.' })
}

export const GetVendorsById = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = req.params.Id;
    const vendorData = await findVendor(vendorId);
    if (vendorData != null)
    {
        return res.json(vendorData);
    }
    return res.json({ "message": `Vendor with ${vendorId} does not exist.` });
}