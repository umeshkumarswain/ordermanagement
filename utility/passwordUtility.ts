const bcrypt = require('bcrypt');
import {Request} from 'express'
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';
import { VendorPayload } from '../dto';
import { AuthPayload } from '../dto/auth.dto';

export const GenerateSalt =async () => {
    return await bcrypt.genSalt();
}

export const GeneratePassword = async (password:string,salt:string) => {
    return await bcrypt.hash(password, salt);
}

export const validatePassword =async (enteredPassword:string,savedPassword:string,salt:string) => {
    return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

export const GenerateSignature = async (payload:AuthPayload) => {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: '1d' });
}

export const ValidateSignature = async (request: Request) => {
    const signature = request.get('Authorization');
    if (signature) {
        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload;
        request.user = payload;
        return true;
    }
    return false;
}