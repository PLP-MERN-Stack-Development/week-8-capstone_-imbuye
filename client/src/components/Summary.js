import React from 'react';
import './Summary.css';

const Summary = ({ totalCost, splitCount, costPerPerson, onSplitChange }) => {
  const handleCopy = () => {
    const summaryText = `🧾 Summary:
- Total Cost: KES ${totalCost.toFixed(2)}
- People: ${splitCount}
- Each Pays: KES ${costPerPerson}`;

    navigator.clipboard.writeText(summaryText)
      .then(() => alert("✅ Summary copied to clipboard!"))
      .catch(err => console.error("Failed to copy summary:", err));
  };

  return (
    <div className="summary-container">
      <h2>Summary</h2>
      <p><strong>Total Cost:</strong> KES {totalCost.toFixed(2)}</p>
      <p><strong>Split Between:</strong> 
        <input
          type="number"
          min="1"
          value={splitCount}
          onChange={(e) => onSplitChange(parseInt(e.target.value))}
          style={{ width: '50px', marginLeft: '10px' }}
        /> people
      </p>
      <p><strong>Each Person Pays:</strong> KES {costPerPerson}</p>

      {/* 📋 Copy Button */}
      <button className="copy-btn" onClick={handleCopy}>Copy Summary</button>
    </div>
  );
};

export default Summary;
