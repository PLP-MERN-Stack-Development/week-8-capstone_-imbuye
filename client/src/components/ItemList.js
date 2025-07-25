import React, { useState } from 'react';
import './ItemList.css';

const ItemList = ({ items, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({ name: '', quantity: 1, totalPrice: 0 });

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditFields({ name: item.name, quantity: item.quantity, totalPrice: item.totalPrice });
  };

  const handleSave = () => {
    onUpdate({ _id: editId, ...editFields, totalPrice: parseFloat(editFields.totalPrice) });
    setEditId(null);
  };

  return (
    <div className="item-list">
      <h2>🧾 Items List</h2>
      {items.map(item => (
        <div key={item._id} className="item-card">
          {editId === item._id ? (
            <>
              <input
                value={editFields.name}
                onChange={e => setEditFields({ ...editFields, name: e.target.value })}
              />
              <input
                type="number"
                value={editFields.quantity}
                onChange={e => setEditFields({ ...editFields, quantity: Number(e.target.value) })}
              />
              <input
                type="number"
                value={editFields.totalPrice}
                onChange={e => setEditFields({ ...editFields, totalPrice: e.target.value })}
              />
              <button onClick={handleSave}>💾 Save</button>
              <button onClick={() => setEditId(null)}>❌ Cancel</button>
            </>
          ) : (
            <>
              <p><strong>{item.name}</strong> x{item.quantity} - KES {item.totalPrice}</p>
              <button onClick={() => handleEdit(item)}>✏️ Edit</button>
              <button onClick={() => onDelete(item._id)}>🗑️ Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
