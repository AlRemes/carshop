import React, { useState } from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


function Addcar( {addCar, fetchCars} ){

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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
      addCar(car);
      setCar({
        brand: '',
        model:'',
        color:'',
        fuel:'',
        year:'',
        price:''
      })
      setOpen(false);
  }

  const updateCar = (updatedCar, link) => {
    fetch(link, {
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(updatedCar)
    })
    .then(response => {
        if (response.ok){
            fetchCars();
        }
        else{
            alert('Something went wrong')
        }
    })
    .catch(err => console.error(err))
  }

  const inputChange = (event) => {
    setCar({...car, [event.target.name]:event.target.value})
  }

  return (
      <div>
          <Button variant="outlined" onClick={handleClickOpen} style={{marginTop:10}}>
        Add car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
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

export default Addcar;