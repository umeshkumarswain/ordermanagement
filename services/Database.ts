const mongoose = require("mongoose");
import { MONGO_URI } from "../config";

export default async () => {
    try {
        await            mongoose.connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log('DB connected....')
    } catch (error) {
        console.log(error)
    }
}



