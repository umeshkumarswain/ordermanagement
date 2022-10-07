import { Request, Response, NextFunction } from "express";
import { EditVendorInput, VendorLoginInputs } from "../dto";
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