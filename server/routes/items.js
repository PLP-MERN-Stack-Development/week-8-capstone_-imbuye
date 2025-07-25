// backend/routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/', async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

// POST a new item
router.post('/', async (req, res) => {
  const { name, quantity, totalPrice } = req.body;
  try {
    const item = new Item({ name, quantity, totalPrice });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) an item
router.put('/:id', async (req, res) => {
  const { name, quantity, totalPrice } = req.body;
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, quantity, totalPrice },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
