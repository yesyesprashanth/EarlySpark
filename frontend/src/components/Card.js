import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useData } from '../utils/DataContext';
import Modal from '@mui/material/Modal';
import './Card.css';
import Box from '@mui/material/Box';
import ClinicianRegistration from '../forms/ClinicianRegistration';
import TeacherRegistration from '../forms/TeacherRegistration';
import StudentRegistration from '../forms/StudentRegistration';

// Material Card Component
export const MaterialCard = () => {
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

// Screening Card Component
export const ScreeningCard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [screeningSearch, setScreeningSearch] = useState('');
  
  const [screeningData] = useState([
    { id: 1, name: 'Screening 1', department: 'Physics' },
    { id: 2, name: 'Screening 2', department: 'Biology' },
  ]);

  // Reuse same columns as MaterialCard
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

// User Card Component with Modal
export const UserCard = () => {
  const { userData } = useData();
  const [open, setOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  const handleCreateClick = () => {
    switch (userData.role) {
      case 'Institute':
        setSelectedForm(<ClinicianRegistration />);
        break;
      case 'School':
        setSelectedForm(<TeacherRegistration />);
        break;
      case 'Teacher':
        setSelectedForm(<StudentRegistration />);
        break;
      default:
        setSelectedForm(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedForm(null);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#333',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
  };

  return (
    <>
      <div className="custom-card">
        <h3 className='users'>User</h3>
        {userData.role?.toLowerCase() !== 'clinician' &&
          userData.role?.toLowerCase() !== 'nodal' && (
            <button onClick={handleCreateClick} className="custom-create-button">
              Create
            </button>
          )}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <button
            className="close-modal-btn"
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              width: '30px',
              height: '30px',
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: '30px',
            }}
          >
            X
          </button>
          {selectedForm}
        </Box>
      </Modal>
    </>
  );
};

