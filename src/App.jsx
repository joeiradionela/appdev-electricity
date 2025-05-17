import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [data, setData] = useState([]);

  // Function to fetch the data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch('https://app-dev-backend.onrender.com/data');
      const result = await response.json();
      setData(prevData => [...prevData, ...result]);  // Append new data to the existing data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // UseEffect to call fetchData continuously
  useEffect(() => {
    fetchData(); // Fetch data initially
    const intervalId = setInterval(fetchData, 10000); // Poll every 10 seconds

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f4f4', width: '129%' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Real-Time Electricity Consumption Data</h1>

      {/* Displaying Data in a Table with a Simple Design */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <th style={{ padding: '12px', textAlign: 'center' }}>ID</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Current (A)</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Voltage (V)</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Power (W)</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>KWh</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={entry.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e9e9e9' }}>
              <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{entry.id}</td>
              <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{entry.current}</td>
              <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{entry.voltage}</td>
              <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{entry.power}</td>
              <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{entry.kwh}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
