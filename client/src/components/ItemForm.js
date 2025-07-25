import React, { useState, useEffect } from 'react';
import './ItemForm.css';

const ItemForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const price = parseFloat(pricePerUnit);
    const qty = parseInt(quantity);
    if (!isNaN(price) && !isNaN(qty)) {
      setTotalPrice(price * qty);
    } else {
      setTotalPrice(0);
    }
  }, [pricePerUnit, quantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !pricePerUnit || totalPrice === 0) return;

    onAdd({
      name,
      quantity,
      pricePerUnit: parseFloat(pricePerUnit),
      totalPrice,
    });

    setName('');
    setQuantity(1);
    setPricePerUnit('');
    setTotalPrice(0);
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />

      <input
        type="number"
        placeholder="Price per Unit"
        value={pricePerUnit}
        min="0"
        step="0.01"
        onChange={(e) => setPricePerUnit(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Total Price"
        value={totalPrice}
        readOnly
      />

      <button type="submit">➕ Add</button>
    </form>
  );
};

export default ItemForm;
