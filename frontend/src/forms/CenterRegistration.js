import { useState } from 'react';
import { TextField, MenuItem, Select, FormHelperText, InputLabel, FormControl, Button, Grid, Container } from '@mui/material';

const InstituteRegistration = ({ closeModal }) => {
  const [formData, setFormData] = useState({

    rciId: '',
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    nodalCentre: '',
  });

  const [errors, setErrors] = useState({

    rciId: false,
    name: false,
    contactPerson: false,
    phone: false,
    email: false,
    address: false,
    city: false,
    state: false,
    nodalCentre: false,
  });

  const nodalCentres = ['Centre 1', 'Centre 2', 'Centre 3', 'Centre 4'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' || name === 'contactPerson') {
      if (!/^[A-Za-z\s]*$/.test(value)) return;
    }

    if (name === 'phone') {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
     
      rciId: formData.rciId.trim() === '',
      name: formData.name.trim() === '' || !/^[A-Za-z\s]+$/.test(formData.name),
      contactPerson: formData.contactPerson.trim() === '' || !/^[A-Za-z\s]+$/.test(formData.contactPerson),
      phone: formData.phone.trim() === '' || !/^\d{10}$/.test(formData.phone),
      email: formData.email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      address: formData.address.trim() === '',
      city: formData.city.trim() === '',
      state: formData.state.trim() === '',
      nodalCentre: formData.nodalCentre.trim() === '',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      console.log('Submitted Data:', formData);
      alert('Registration successful!');
      closeModal();
    }
  };

  return (
    <Container maxWidth="xs">
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="form-header">Center inaRegistration</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Register Id"
                name="rciId"
                value={formData.rciId}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                error={errors.rciId}
                helperText={errors.rciId ? "This field is required" : ""}
             
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label=" Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                error={errors.name}
                helperText={errors.name ? "Please enter a valid name" : ""}
              
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Name"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                error={errors.contactPerson}
                helperText={errors.contactPerson ? "Please enter a valid contact person name" : ""}
              
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                error={errors.phone}
                helperText={errors.phone ? "Please enter a valid 10-digit phone number" : ""}
             
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                error={errors.email}
                helperText={errors.email ? "Please enter a valid email address" : ""}
             
              />
            </Grid>

            {/* Address in single line */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                error={errors.address}
                helperText={errors.address ? "This field is required" : ""}
              
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                error={errors.city}
                helperText={errors.city ? "This field is required" : ""}
            
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                size="small"
                error={errors.state}
                helperText={errors.state ? "This field is required" : ""}
              
              />
            </Grid>

            {/* Nodal Centre dropdown with white label */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" error={errors.nodalCentre}>
                <InputLabel >Nodal Centre</InputLabel>
                <Select
             label="nodalCentre"
                  name="nodalCentre"
                  value={formData.nodalCentre}
                  onChange={handleInputChange}
              
                >
                  <MenuItem value="">--Select Nodal Centre--</MenuItem>
                  {nodalCentres.map((centre, index) => (
                    <MenuItem key={index} value={centre}>
                      {centre}
                    </MenuItem>
                  ))}
                </Select>
                {errors.nodalCentre && <span className="error-message"></span>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth size="small">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
    </Container>
  );
};

export default InstituteRegistration;
