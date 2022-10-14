import mongoose, { Schema, Document, model } from 'mongoose';

export interface FoodDoc extends Document{
    vendorId:string,
    name:string,
    description:string,
    category:string,
    foodType:string,
    readyTime:number,
    price:number,
    rating:number,
    images:[string]
}

const foodSchema = new Schema({
    vendorId: {type:String},
    name: {type:String,required:true},
    description: { type: String, required: true },
    category: { type: String},
    foodType: { type: String, required: true },
    readyTime: { type: String },
    price: { type: String, required: true },
    rating:{ type: Number },
    images:{ type: [String] },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
    timestamps: true
});

const food = mongoose.model<FoodDoc>('food', foodSchema);

export {food}