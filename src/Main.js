
import './App.css';
import Dashboard from './Dashboard';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import axios from 'axios';


function Main() {
    const [employeeData, setEmployeeData] = useState([]);
    const [below18Data, minorData] = useState([]);
    const [above18Data, majorData] = useState([]);
    const [below45Data, young] = useState([]);
    const [above45Data, old] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        Age: '',
        email: '',
        Mobile: '',
      });
    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5000/employee')
          .then(response => response.json())
          .then(data => {
          var below18 =  data.filter(e => e.Age <= 18)
          minorData(below18)
          var above18 =  data.filter(e => e.Age >= 19 && e.Age <= 25)
          majorData(above18)
          var below45Data =  data.filter(e => e.Age >= 26 && e.Age <= 45)
          young(below45Data)
          var above45Data =  data.filter(e => e.Age >=45)
          old(above45Data)
          }
           )
          .catch(error => console.error('Error fetching data:', error));
      }, []); 

      const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
      };
      const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        // Reset the newEmployee state after closing the dialog
        setNewEmployee({
          name: '',
          Age: '',
          email: '',
          Mobile: '',
        });
      };
      const handleInputChange = (e) => {
        console.log("e",e)
        console.log("e.target",e.target)
        const { name, value } = e.target;
        setNewEmployee((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleSaveNewEmployee = () => {
        // Send a POST request using Axios
        axios.post('http://localhost:5000/employee', newEmployee)
          .then((response) => {
            console.log('Employee saved successfully:', response.data);
            handleCloseAddDialog();
            // You may want to perform additional actions after a successful save
          })
          .catch((error) => {
            console.error('Error saving employee:', error);
            // Handle error appropriately
          });
      };
       
  return (
    console.log("below18Data",below18Data),
    console.log("above18Data",above18Data),
    console.log("below45Data",below45Data),
    console.log("above45Data",above45Data),
    <div>
         <nav>
        <h1>Mantra Technologies</h1>
        <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
        Add Employee
      </Button>
    </nav>

    <div className="cardlistviews">
    <li className="listing">
      <Dashboard parentdata={below18Data}/>
      </li>
      <li className="listing">
      <Dashboard parentdata={above18Data}/>
      </li>
      <li className="listing">
      <Dashboard parentdata={below45Data}/>
      </li>
      <li className="listing">
      <Dashboard parentdata={above45Data}/>
      </li>
    </div>

      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
         <DialogTitle>Add New Employee</DialogTitle>
         <DialogContent>
           <TextField
             label="Name"
             value={newEmployee.name}
             fullWidth
             margin="normal"
             name="name"
             onChange={handleInputChange}
           />
           <TextField
             label="Age"
             value={newEmployee.Age}
             fullWidth
             margin="normal"
             name="Age"
             onChange={handleInputChange}
           />
           <TextField
             label="Email"
             value={newEmployee.email}
             fullWidth
             margin="normal"
             name="email"
             onChange={handleInputChange}
           />
           <TextField
             label="Mobile"
             value={newEmployee.Mobile}
             fullWidth
             margin="normal"
             name="Mobile"
             onChange={handleInputChange}
           />
         </DialogContent>
         <DialogActions>
           <Button onClick={handleCloseAddDialog} color="primary">
             Cancel
           </Button>
           <Button onClick={handleSaveNewEmployee} color="primary">
             Save
           </Button>
         </DialogActions>
       </Dialog>
    </div>
  );
}

export default Main;
