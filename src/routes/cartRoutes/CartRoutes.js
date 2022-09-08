import { Router } from 'express';
import { cartsDao as api } from '../../daos/index.js';
const cartsRouter = Router();

cartsRouter.get('/', async (req, res) => {
    try {
        const carts = await api.getAll();
        carts ? res.status(200).json(carts) : res.status(404).json({ message: 'No hay carritos disponibles' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//devuelve carrito por su id
cartsRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const cart = await api.getOne(id);
        cart ? res.status(200).json(cart) : res.status(404).json({ message: 'Carrito no encontrado. id: ' + id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//crea nuevo carrito
cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await api.create({ productos: [], cantidad: 0 });
        res.status(201).json({
            carrito: newCart
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// devuelve productos de un carrito
cartsRouter.get('/:id/productos', async (req, res) => {
    try {
        const { id } = req.params
        const cart = await api.getOne(id);
        cart ? res.status(200).json(cart.productos) : res.status(404).json({ message: 'Carrito no encontrado. id: ' + id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//agregar productos a un carrito
cartsRouter.post('/:id/productos', async (req, res) => {
    try {
        const { id } = req.params
        const cart = await api.getOne(id);
        //lista de productos
        const products = req.body;
        //si no hay carrito
        if (!cart) {
            res.status(404).json({ message: 'Carrito no encontrado. id: ' + id });
        }
        //si no hay productos
        if (!products) {
            res.status(404).json({ message: 'La lista de productos está vacía' });
        }
        //si existen ambos
        if (cart && products) {
            const cartUpdated = await api.addProducts(cart, products);
            res.status(201).json({
                agregado: cart
            });
        }

    } catch (err) {
        res.json({ mssg: err.message });
    }
});

// borrar producto de un carrito
cartsRouter.delete('/:id/productos/:productoId', async (req, res) => {
    try {
        const { id } = req.params
        const { productoId } = req.params
        const cart = await api.getOne(id);

        if (!cart) {
            res.status(404).json({ message: 'Carrito no encontrado. id: ' + id });
        }
        if (!productoId) {
            res.status(404).json({ message: 'El producto no existe' });
        }

        if (cart && productoId) {
            const cartUpdated = await api.deleteProduct(cart, productoId);

            res.status(200).json({
                eliminado: productoId
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//eliminar carrito
cartsRouter.delete('/:id/productos', async (req, res) => {
    try {
        const { id } = req.params
        const cartDelete = await api.delete(id);
        res.status(200).json({
            message: "carrito eliminado",
            carrito: cartDelete
        });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})

export default cartsRouter