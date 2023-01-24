import { Types } from "mongoose";

export type productType = {
    owner: Types.ObjectId,
    name: string,
    description: string,
    price: number,
    size: string,
    colours: string,
    unit_price: number
}