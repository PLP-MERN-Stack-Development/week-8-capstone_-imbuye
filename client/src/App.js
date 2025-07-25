import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import Summary from './components/Summary';
import Welcome from './components/Welcome';
import Feedback from './components/Feedback';
import axios from 'axios';
import './App.css';
import './components/Summary.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [splitCount, setSplitCount] = useState(1);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Use environment variable for backend URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/items`)
      .then(res => {
        console.log('✅ Fetched items:', res.data);
        setItems(res.data);
      })
      .catch(err => console.error('❌ Error fetching items:', err));
  }, [API_BASE_URL]);

  const addItem = (newItem) => {
    axios.post(`${API_BASE_URL}/api/items`, newItem)
      .then(res => {
        console.log('✅ Item added:', res.data);
        setItems([...items, res.data]);
      })
      .catch(err => console.error('❌ Error adding item:', err));
  };

  const deleteItem = (id) => {
    axios.delete(`${API_BASE_URL}/api/items/${id}`)
      .then(() => {
        console.log(`✅ Item ${id} deleted`);
        setItems(items.filter(item => item._id !== id));
      })
      .catch(err => console.error('❌ Error deleting item:', err));
  };

  const updateItem = (updatedItem) => {
    axios.put(`${API_BASE_URL}/api/items/${updatedItem._id}`, updatedItem)
      .then(res => {
        console.log('✅ Item updated:', res.data);
        const updatedList = items.map(item => item._id === updatedItem._id ? res.data : item);
        setItems(updatedList);
      })
      .catch(err => console.error('❌ Error updating item:', err));
  };

  const totalCost = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const costPerPerson = splitCount > 0 ? (totalCost / splitCount).toFixed(2) : 0;

  // ✅ Only render welcome screen at first load
  if (showWelcome) {
    return (
      <Welcome
        onStart={() => {
          setShowWelcome(false); // continues without login
        }}
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          setShowWelcome(false); // login success
        }}
      />
    );
  }

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/">Home</Link> | <Link to="/feedback">Feedback</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>🛍️ Cost Splitter</h1>
                <ItemForm onAdd={addItem} />
                <ItemList items={items} onDelete={deleteItem} onUpdate={updateItem} />
                <Summary
                  totalCost={totalCost}
                  splitCount={splitCount}
                  costPerPerson={costPerPerson}
                  onSplitChange={setSplitCount}
                />
              </>
            }
          />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
