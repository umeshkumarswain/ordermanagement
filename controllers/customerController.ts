import { Request, Response, NextFunction } from "express";
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCustomerInputs } from "../dto/customer.dto";
import { GenerateOTP, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOTP } from "../utility";
import { Customer } from "../models/customer";

export const CustomerSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const customerInputs = plainToClass(CreateCustomerInputs, req.body);
    const inputErrors = await validate(customerInputs, {
        validationError: { target: true }
    });
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }
    const { email, password, phone } = customerInputs;
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);
    const { otp, expiry } = GenerateOTP();

    const existingCustomer = await Customer.findOne({email:email});
    if(existingCustomer != null){
        return res.status(409).json({message:"Email id is already registered with us,Please try with another email id."})
    }
    const result = await Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        otp: otp,
        otp_expiry: expiry,
        firstName: '',
        lastname: '',
        address: '',
        verified: false,
        lat: 0,
        lng: 0
    })

    if (result) {
        //TODO: Twilio account was not set up.Check later
        //await onRequestOTP(otp, phone);
        const signature = await GenerateSignature({
            _id: result._id,
            email: result.email,
            verified: result.verified
        });

        return res.status(201).json({
            signature:signature,
            verified: result.verified,
            email: result.email,
        })
    }
    return res.status(200).json({message:"error with sign up."});
}

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {

}

export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {
    const {otp} = req.body;
    const customer = req.user;

    if(customer){
        const profile = await Customer.findById(customer._id);
        if(profile){
            if(profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()){
                profile.verified = true;
                const updatedCustomerResponse = await profile.save();
                const signature = await GenerateSignature({
                    _id: updatedCustomerResponse._id,
                    email: updatedCustomerResponse.email,
                    verified: updatedCustomerResponse.verified
                });

                return res.status(201).json({
                    signature:signature,
                    verified:updatedCustomerResponse.verified,
                    email:updatedCustomerResponse.email
                })
            }
        }
    }
    return res.status(200).json({message:"error with otp validation."});
}

export const RequestOTP = async (req: Request, res: Response, next: NextFunction) => {

}

export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

}
export const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

}