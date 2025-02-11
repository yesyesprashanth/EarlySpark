import React, { useState } from 'react';
import {
  TextField,
  Container,
  Button,
  Grid,
  Typography,
  Box
} from '@mui/material';

const ExaminerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    nodeId:'',
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    nodeId:false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Allow only valid input for phone and name fields
    if (name === 'phone' && !/^\d*$/.test(value)) return;
    if (name === 'name' && !/^[A-Za-z\s]*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    const newErrors = {
      name: formData.name.trim() === '' || !/^[A-Za-z\s]+$/.test(formData.name),
      phone: formData.phone.trim() === '' || !/^\d{10}$/.test(formData.phone),
      email: formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      nodeId: formData.nodeId.trim() === '' || !/^\d$/.test(formData.phone),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      console.log('Submitted Data:', formData);
      alert('Teacher Registration successful!');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 1, p: 4, boxShadow: 3, borderRadius: 2 }}>

        <Typography variant="h6" align="center" gutterBottom sx={{ color: "#a5e526" }}>
          Examiner Registration
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                helperText={errors.name ? 'Name is required and must contain only alphabets.' : ''}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                helperText={errors.phone ? 'Phone number must be 10 digits.' : ''}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email (Optional)"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                helperText={errors.email ? 'Enter a valid email address.' : ''}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Node Id"
                name="nodeId"
                value={formData.nodeId}
                onChange={handleInputChange}
                error={errors.nodeId}
                helperText={errors.nodeId ? 'nodeId is required and must contain only alphabets.' : ''}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ExaminerRegistration;
