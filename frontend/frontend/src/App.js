import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Assuming you have a CSS file for basic styling

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState(null);

  const validateJSON = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (validateJSON(jsonInput)) {
      setJsonError('');
      try {
        const res = await axios.post('https://bfhl-backend-n4zg.onrender.com/bfhl', JSON.parse(jsonInput));
        setResponse(res.data);
        setFilteredResponse(null);
      } catch (error) {
        console.error('API call failed:', error);
      }
    } else {
      setJsonError('Invalid JSON format.');
    }
  };

  const handleFilter = () => {
    if (!response) return;

    const filtered = [];

    if (selectedOptions.includes('Alphabets')) {
      filtered.push(...response.data.filter(item => isNaN(item)));
    }

    if (selectedOptions.includes('Numbers')) {
      filtered.push(...response.data.filter(item => !isNaN(item)));
    }

    if (selectedOptions.includes('Highest lowercase alphabet')) {
      const lowerAlphabets = response.data.filter(item => /^[a-z]$/.test(item));
      if (lowerAlphabets.length) {
        filtered.push(Math.max(...lowerAlphabets));
      }
    }

    setFilteredResponse(filtered.join(', '));
  };

  return (
    <div className="app-container">
      <h1>21BCE5560 - BFHL</h1>
      <div className="input-section">
        <label>API Input</label>
        <textarea
          className="json-input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data":["M","1","334","4","B"]}'
        />
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        {jsonError && <p style={{ color: 'red' }}>{jsonError}</p>}
      </div>
      {response && (
        <div className="filter-section">
          <label>Multi Filter</label>
          <select
            className="multi-select"
            multiple
            value={selectedOptions}
            onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(option => option.value))}
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          <button className="filter-btn" onClick={handleFilter}>Filter</button>
        </div>
      )}
      {filteredResponse && (
        <div className="response-section">
          <h2>Filtered Response</h2>
          <p>{filteredResponse}</p>
        </div>
      )}
    </div>
  );
}

export default App;