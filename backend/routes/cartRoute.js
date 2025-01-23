import mongoose from "mongoose";
import {Cart} from "../models/cartModel.js";

const router = express.Router();
router.post('/create-cart', async (req, res) => {
    try {
      const { userId } = req.body;
      const cartId = crypto.randomBytes(4).toString('hex'); // Generate a unique cart ID
  
      const newCart = new Cart({
        cartId,
        createdBy: userId,
        users: [userId], // Add the creator as the first user
      });
      await newCart.save();
  
      const qrCode = await QRCode.toDataURL(cartId);
      res.status(201).json({ cartId, qrCode });
    } catch (error) {
      res.status(500).json({ message: 'Error creating cart', error: error.message });
    }
  });
  
  // Join an existing cart
  router.post('/join-cart', async (req, res) => {
    try {
      const { cartId, userId } = req.body;
  
      const cart = await Cart.findOne({ cartId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      if (!cart.users.includes(userId)) {
        cart.users.push(userId);
        await cart.save();
      }
  
      // Notify other users in the cart room
      io.to(cartId).emit('cart-updated', cart);
  
      res.status(200).json({ message: 'Successfully joined the cart', cartId });
    } catch (error) {
      res.status(500).json({ message: 'Error joining cart', error: error.message });
    }
  });
  
  router.post('/cart/:cartId/add-item', (req, res) => {
    console.log('Request received with cartId:', req.params.cartId);
    console.log('Request body:', req.body);
    res.status(200).json({ message: 'Request successful' });
  });
  
  
  // Retrieve cart details
  router.get('/cart/:cartId', async (req, res) => {
    try {
      const { cartId } = req.params;
  
      const cart = await Cart.findOne({ cartId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
  });

  export default router;