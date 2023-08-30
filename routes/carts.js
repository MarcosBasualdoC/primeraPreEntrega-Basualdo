const express = require('express');
const router = express.Router();
const CartManager = require('../CartManager');


const cartManager = new CartManager('../carts.json'); 

/////////7
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

//////
router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cartId);
        res.json(cart.products);
    } catch (error) {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

/////////
router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        const updatedCart = await cartManager.addProductToCart(cartId, productId);
        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }
});

module.exports = router;
