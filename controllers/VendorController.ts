import { Request, Response, NextFunction } from "express";
import { VendorLoginInputs } from "../dto";
import { validatePassword } from "../utility";
import { findVendor } from "./AdminController";

export const vendorLogin = async (req:Request,res:Response,next:NextFunction) => {
    const { email, password } = <VendorLoginInputs> req.body;
    const existingVendor = await findVendor("", email);
    if (existingVendor != null) {
        const validation = await validatePassword(password, existingVendor.password, existingVendor.salt);
        if (validation) {
            return res.json({existingVendor})
        }
        else {
            return res.json({ "message": "Invalid Password" })
        }
    }
    return res.json({"message":"Invalid Credentials"})
} 