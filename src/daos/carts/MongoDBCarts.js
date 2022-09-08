import MongoClass from "../../contenedores/MongoClass.js";
import { cartSchema } from "../../models/CartSchema.js";
import { productsDao as productsBD } from "../index.js";



export class MongoDBCarts extends MongoClass {
    constructor() {
        super("carritos", cartSchema)
    }

    //agregar productos al carrito
    async addProducts(cart, products) {
        let cont = 0
        for (let i = 0; i < products.length; i++) {
            //guardo el id de los productos 
            const idProduct = products[i]
            //busco si existem los productos en la BD products
            const buscandoProd = await productsBD.getOne(idProduct)
            if (!buscandoProd) {
                throw new Error("error producto no econtrado")
            } else {
                cart.productos.push(idProduct)
            }
            cont++
        }
        //cuando recorra todos los productos
        if (cont == products.length) {
            //suma la cantidad de productos
            const totalProductosAgregados = products.length
            cart.cantidad += totalProductosAgregados
            //Actualiza el carrito 
            const cartUpdated = await this.collection.findByIdAndUpdate(cart._id, { productos: cart.productos, cantidad: cart.cantidad });
            return cartUpdated;
        }
    }

    //elimina productos del carrito por id
    async deleteProduct(cart, idProduct) {
        const productExist = cart.productos.find(el => el._id == idProduct);
        if (productExist) {
            cart.productos = cart.productos.filter(product =>
                product._id != idProduct);
        } else {
            throw new Error("El producto no esta en el carrito");
        }
        cart.cantidad = cart.productos.length
        const carritoUpdated = await this.collection.findByIdAndUpdate(cart._id, { productos: cart.productos, cantidad: cart.cantidad });
        return carritoUpdated;
    }
}