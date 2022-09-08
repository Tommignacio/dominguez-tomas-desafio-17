import { Router } from 'express';
import { productsDao as api } from '../../daos/index.js';

const productsRouter = Router();

//
productsRouter.get('/', async (req, res) => {
    try {
        const allProducts = await api.getAll();
        allProducts ? res.status(200).json(allProducts) : res.status(404).json({ message: 'No hay productos disponibles' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

productsRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const oneProduct = await api.getOne(id);
        oneProduct ? res.status(200).json(oneProduct) : res.status(404).json({ message: 'Producto no encontrado. id: ' + req.params.id });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await api.create(product);
        console.log(newProduct)
        res.status(201).json({
            producto: newProduct
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

productsRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productNew = req.body;
        const updatedProduct = await api.update(id, productNew);
        res.json("producto actualizado ");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

productsRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await api.delete(id);
        res.json({
            message: 'Producto borrado correctamente',
            id: deleteProduct._id
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default productsRouter;