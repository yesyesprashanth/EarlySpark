import React, { useState } from 'react';
import { TextField, Container, Button, Grid, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ClientRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    class: '',
  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState({
    name: false,
    age: false,
  });

  const classes = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']; // Class options

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Validate inputs
    if (name === 'name') {
      const isValidName = /^[a-zA-Z\s]+$/.test(value);
      setErrors((prevErrors) => ({ ...prevErrors, name: !isValidName }));
    }

    if (name === 'age') {
      const isValidAge = /^[0-9]+$/.test(value);
      setErrors((prevErrors) => ({ ...prevErrors, age: !isValidAge }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check
    const isValidName = /^[a-zA-Z\s]+$/.test(formData.name);
    const isValidAge = /^[0-9]+$/.test(formData.age);

    if (!isValidName || !isValidAge) {      
      return;
    }

    console.log('Submitted Data:', formData);
    navigate("/screeningtest")

  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 1, p: 4, boxShadow: 3, borderRadius: 2 }}>

        <Typography variant="h6" align="center" gutterBottom sx={{ color: "#a5e526" }}>
          Client Registration
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
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                error={errors.age}
                helperText={errors.age ? 'Age is required and must be a number.' : ''}
                fullWidth
                variant="outlined"
                size="small"

              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: "14px", top: "-5px" }}>Gender</InputLabel>
                <Select
                  name="gender" // Change from "class" to "gender"
                  value={formData.gender} // Ensure it matches state
                  onChange={handleInputChange}
                  label="Gender"
                  size="small"
                  variant="outlined"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        color: 'black',
                      },
                    },
                  }}
                  sx={{
                    height: "40px",
                    color: 'black',
                  }}
                  required
                >
                  <MenuItem value="Male" style={{ color: 'black' }}>Male</MenuItem>
                  <MenuItem value="Female" style={{ color: 'black' }}>Female</MenuItem>
                  <MenuItem value="Other" style={{ color: 'black' }}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: "14px", top: "-5px" }}>Class</InputLabel>
                <Select
                  name="class" // Keep this as "class"
                  value={formData.class} // Ensure it matches state
                  onChange={handleInputChange}
                  label="Class"
                  size="small"
                  variant="outlined"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        color: 'black',
                      },
                    },
                  }}
                  sx={{
                    height: "40px",
                    color: 'black',
                  }}
                  required
                >
                  <MenuItem value="">
                    <em>Select Class</em>
                  </MenuItem>
                  {classes.map((classOption, index) => (
                    <MenuItem key={index} value={classOption} style={{ color: 'black' }}>
                      {classOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>





            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ClientRegistration;
