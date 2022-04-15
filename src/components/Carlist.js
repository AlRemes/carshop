import react, { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import  Snackbar  from '@mui/material/Snackbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Addcar from './Addcar';
import Editcar from './Editcar';


function Carlist(){

    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    //Fetch cars on the first render
    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL)
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.log(err))
    }, []);

    const fetchCars = () =>{
        fetch(process.env.REACT_APP_API_URL)
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.log(err))
    }

    const deleteCar = (link) => {
        if(window.confirm("Are you sure you want to delete?")){
        fetch(link, { method: 'DELETE' })
        .then(response => {
            if(!response.ok){
                alert('Something wrong with deletion')
            } else{
                setOpen(true);
                fetchCars();
            }
        })
        .catch(err => console.error(err))
    }}

    const addCar = (newCar) => {
        fetch(process.env.REACT_APP_API_URL, 
        { method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newCar)
    })
    .then(response => {
        if(response.ok){
            fetchCars();
        }
        else{
            alert('Something went wrong')
        }
    })
    .catch(err => console.log(err))
    }

    const updateCar = (updatedCar, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            if (response.ok){
                fetchCars();
            } else{
                alert('Something went wrong in edit')
            }
        })
        .catch(err => console.error(err))
    }

    const [columns] = useState([
        {field: 'brand', sortabla: true, filter:true},
        {field: 'model', sortabla: true, filter:true},
        {field: 'color', sortabla: true, filter:true, width:150},
        {field: 'fuel', sortabla: true, filter:true, width:120},
        {field: 'year', sortabla: true, filter:true, width:120},
        {field: 'price', sortabla: true, filter:true},
        {
            headerName:'',
            width:100,
            field:'_links.self.href',
            cellRenderer: params =>
            <Editcar params={params} updateCar={updateCar}/>
        },
        {
        field:'_links.self.href', 
        headerName:'', 
        width:100,
    cellRenderer: params => 
    <IconButton color='error' onClick={() => deleteCar(params.value)}>
        <DeleteIcon />
    </IconButton>}
    ]);

    return(
        <>
        <Addcar addCar={addCar}/>
            <div className="ag-theme-material" style={{height: 600, width: '100%'}}>
                <AgGridReact 
                    columnDefs={columns}
                    rowData={cars}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellFocus={true}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Car deleted"
            />
        </>
    );
}

export default Carlist;