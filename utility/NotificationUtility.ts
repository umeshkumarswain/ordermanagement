export const GenerateOTP = () =>{
    const otp = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime()+ (30*60*1000));
    return {otp,expiry};
}


export const onRequestOTP = async (otp:Number,toPhoneNumber:string) =>{
    const accountsid = "";
    const authToken = "";
    const client =  require("twilio")(accountsid,authToken);
    return await client.messages.create({
        body:`Your otp is ${otp}`,
        from:'',
        to:toPhoneNumber
    });
}