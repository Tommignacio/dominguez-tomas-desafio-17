import MongoClass from "../../contenedores/MongoClass.js";
import { productSchema } from "../../models/ProductSchema.js";


export class MongoDBProducts extends MongoClass {
    constructor() {
        super("productos", productSchema)
    }
}