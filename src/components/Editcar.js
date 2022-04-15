import React, { useState } from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit'

function Editcar( {params, updateCar} ){

    const [car, setCar] = useState({
        brand: '',
        model:'',
        color:'',
        fuel:'',
        year:'',
        price:''
    });

    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
      setCar({
          brand: params.data.brand,
          model: params.data.model,
          color: params.data.color,
          fuel: params.data.fuel,
          year: params.data.year,
          price: params.data.price
      })
      console.log(params);
    setOpen(true);
  };

  const handleClose = () => {
    updateCar(car, params.value);
    setOpen(false);
  };

  const handleSave = () => {
      updateCar(car, params.value);
      setOpen(false);
  }

  const inputChange = (event) => {
    setCar({...car, [event.target.name]:event.target.value})
  }

  return (
      <div>
          <IconButton variant="outlined" onClick={handleClickOpen} >
        <EditIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="brand"
            value={car.brand}
            onChange={inputChange}
            label="Brand"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="model"
            value={car.model}
            onChange={inputChange}
            label="Model"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="color"
            value={car.color}
            onChange={inputChange}
            label="Color"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="fuel"
            value={car.fuel}
            onChange={inputChange}
            label="Fuel"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="year"
            value={car.year}
            onChange={inputChange}
            label="Year"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="price"
            value={car.price}
            onChange={inputChange}
            label="Price"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      </div>
  )


}

export default Editcar;