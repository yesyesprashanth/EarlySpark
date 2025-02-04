// src/card/MaterialCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import './Card.css';

const MaterialCard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [materialSearch, setMaterialSearch] = useState('');
  
  const [materialData] = useState([
    { id: 1, name: 'Material 1', department: 'Science' },
    { id: 2, name: 'Material 2', department: 'Mathematics' },
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

  const filteredMaterial = materialData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="custom-card">
      <h3>Material</h3>
      <input
        type="text"
        placeholder="Search Material..."
        className="search-bar"
        value={materialSearch}
        onChange={(e) => setMaterialSearch(e.target.value)}
      />
      <button onClick={() => setSearchQuery(materialSearch)} className="search-button">
        Search
      </button>
      <div className="data-grid-container">
        <DataGrid rows={filteredMaterial} columns={columns} pageSize={5} autoHeight />
      </div>
      <button onClick={() => navigate('/material')} className="custom-create-button">
        Create
      </button>
    </div>
  );
};

export default MaterialCard;