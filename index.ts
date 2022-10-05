import express from "express";
import bodyParser from "body-parser";
import { AdminRoute, VendorRoutes } from "./routes";
import mongoose from 'mongoose';
import { MONGO_URI } from "./config";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoutes);
mongoose.connect(MONGO_URI).then((res) => console.log(res)).catch((err) => console.log(err))

app.listen(8000, () => {
    console.clear();
    console.log('App is listening to the port 8000.')
})