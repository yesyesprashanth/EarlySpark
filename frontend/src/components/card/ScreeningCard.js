
// src/card/ScreeningCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import './Card.css';

const ScreeningCard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [screeningSearch, setScreeningSearch] = useState('');
  
  const [screeningData] = useState([
    { id: 1, name: 'Screening 1', department: 'Physics' },
    { id: 2, name: 'Screening 2', department: 'Biology' },
  ]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'department', headerName: 'Department', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      renderCell: (params) => (
        <button className="edit-buttonss" onClick={() => alert(`Editing row with ID: ${params.row.id}`)}>
          Edit
        </button>
      ),
    },
  ];

  const filteredScreening = screeningData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="custom-card">
      <h3>Screening</h3>
      <input
        type="text"
        placeholder="Search Screening..."
        className="search-bar"
        value={screeningSearch}
        onChange={(e) => setScreeningSearch(e.target.value)}
      />
      <button onClick={() => setSearchQuery(screeningSearch)} className="search-button">
        Search
      </button>
      <div className="data-grid-container">
        <DataGrid rows={filteredScreening} columns={columns} pageSize={5} autoHeight />
      </div>
      <button onClick={() => navigate('/screening')} className="custom-create-button">
        Create
      </button>
    </div>
  );
};

export default ScreeningCard;