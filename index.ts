import express from "express";
import bodyParser from "body-parser";
import { AdminRoute, VendorRoutes } from "./routes";
import { MONGO_URI } from "./config";
const mongoose = require("mongoose");
import path from 'path'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/images',express.static(path.join(__dirname,'images')));


app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoutes);

    
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(8000, () => {
    console.clear();
    console.log('App is listening to the port 8000.')
})