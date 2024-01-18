import React, { useEffect, useState } from 'react';
import './App.css';// Replace 'styles.css' with the actual name of your CSS file
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import Draggable from 'react-draggable';
import axios from 'axios';

const Dashboard = (parentdata) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
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
      .then(data => setEmployeeData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleDelete = (employeeId) => {
    // Make an Axios DELETE request to the server
    axios.delete(`http://localhost:5000/employee/${employeeId}`)
      .then((response) => {
        console.log('Employee deleted successfully:', response.data);

        // Update the list in the state after successful deletion
        // setParentData((prevParentData) => ({
        //   parentdata: prevParentData.parentdata.filter(employee => employee.id !== employeeId),
        // }));

        alert(`Card with employee ID ${employeeId} deleted!`);
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
        // Handle error appropriately
      });
  };


  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setEditEmployee(null);
    setOpenEditDialog(false);
  };

 // ... (previous code)

const handleSaveEdit = () => {
  if (editEmployee) {
    const nameInput = document.getElementById('editName');
    const ageInput = document.getElementById('editAge');
    const emailInput = document.getElementById('editEmail');
    const mobileInput = document.getElementById('editMobile');

    if (nameInput && ageInput && emailInput && mobileInput) {
      const updatedEmployee = {
        id: editEmployee.id,
        name: nameInput.value,
        Age: ageInput.value,
        email: emailInput.value,
        Mobile: mobileInput.value,
      };
    
    // Send a PUT request to update the data
    fetch(`http://localhost:5000/employee/${editEmployee.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEmployee),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response if needed
        alert('Content saved!');
        handleCloseEditDialog();
      })
      .catch(error => {
        console.error('Error updating data:', error);
        alert('Error updating content. Please try again.');
      });
  } else {
    alert('Invalid operation. Please try again.');
  }



};
}
const handleSaveNewEmployee = () => {
  // Add logic to save the new employee details
  // You can make an API call or update the state directly
  // For simplicity, we're just updating the state in this example
  setEmployeeData(prevData => [...prevData, { id: Date.now(), ...newEmployee }]);
  alert('New employee added!');
  handleCloseAddDialog();
};
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
  const { name, value } = e.target;
  setNewEmployee((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

  return (
    console.log("parentdata",parentdata),
    <div className="card-container">
      {parentdata.parentdata.map(employee => (
         <Draggable key={employee.id}>
        <Card key={employee.id} className="card">
          <CardContent className="card-content">
            <Typography variant="h5" component="div">
              <span>Name:</span> {employee.name}
            </Typography>
            <Typography color="text.secondary">
              <span>Age:</span> {employee.Age}
            </Typography>
            <Typography color="text.secondary">
              <span>Email:</span> {employee.email}
            </Typography>
            <Typography color="text.secondary">
              <span>Mobile:</span> {employee.Mobile}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleEdit(employee)}>
              Edit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDelete(employee.id)}
              style={{ color: 'white', backgroundColor: 'red', marginLeft: '10px' }}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
        </Draggable>
      ))}

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          {editEmployee && (
            <>
             <TextField
  label="Name"
  defaultValue={editEmployee.name}
  fullWidth
  margin="normal"
  id="editName"
/>
<TextField
  label="Age"
  defaultValue={editEmployee.Age}
  fullWidth
  margin="normal"
  id="editAge"
/>
<TextField
  label="Email"
  defaultValue={editEmployee.email}
  fullWidth
  margin="normal"
  id="editEmail"
/>
<TextField
  label="Mobile"
  defaultValue={editEmployee.Mobile}
  fullWidth
  margin="normal"
  id="editMobile"
/>

            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

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

      {/* Button to open the Add Dialog */}
      {/* <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
        Add Employee
      </Button> */}
    </div>
  );
};

         
export default Dashboard;
