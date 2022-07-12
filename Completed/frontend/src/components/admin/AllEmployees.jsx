import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Drawer } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import { SideNavigation } from '../layout/SideNavigation';

export const AllEmployees = () => {
  const [employees, setEmployees] = useState([])

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


  let navigate = useNavigate()

  async function getAllEmployees() {

    try {

      const res = await axios.get('http://localhost:8089/employee');
      setEmployees(res.data);

    } catch (error) {
      console.error(error);
    }

  }

  const columns = [
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 100 },
    { id: 'designation', label: 'Designation', minWidth: 50 },
    { id: 'address', label: 'Address', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'dob', label: 'dob', minWidth: 80 },
    { id: 'salary', label: 'salary', minWidth: 60 },
    { id: 'position', label: 'Position', minWidth: 60 },
    { id: 'update', label: 'update', minWidth: 50 },
    { id: 'delete', label: 'delete', minWidth: 50 }
  ]

  async function deleteEmployee(id) {
    await axios.delete(`http://localhost:8089/employee/delete/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.error(err))



    Swal.fire({
      title: 'Deleted Successfully',
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    }).then((value) => {
      Swal.fire((window.location = "/get-all-employees"));
    });
  }

  useEffect(() => {
    getAllEmployees()
  }, [])

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const theme = useTheme();
  const classes = useStyles();



  const rows = employees
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <SideNavigation />

      <Fab
        variant="extended"
        style={{ left: "10%", marginBottom: "1%", top: "-25px" }}
        onClick={() => {
          navigate("/register-employee");
        }}
      >
        <AddIcon />
        Add Employee
      </Fab>
      <TableContainer
        style={{ width: "80%", marginLeft: "10%", justifyContent: "center" }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Designation</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Date of Birth</StyledTableCell>
              <StyledTableCell align="center">Salary</StyledTableCell>
              <StyledTableCell align="center">Position</StyledTableCell>
              <StyledTableCell align="center">Update</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {
              employees.map((employee) => (
                <TableRow hover key={employee.name}>
                  <TableCell component="th" scope="row" align="center">
                    {employee.firstName}
                  </TableCell>
                  <TableCell align="center">{employee.lastName}</TableCell>
                  <TableCell align="center">{employee.designation}</TableCell>
                  <TableCell align="center">{employee.address}</TableCell>
                  <TableCell align="center">{employee.email}</TableCell>
                  <TableCell align="center">{employee.dob.substring(0, 10)}</TableCell>
                  <TableCell align="center">{employee.salary}</TableCell>
                  <TableCell align="center">{employee.position}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        navigate(`/updateEmployee/${employee.id}`);
                      }}
                    >
                      UPDATE
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color="secondary"
                      variant="contained"
                      // onClick={() => {
                      //     deleteEmployee(employee.id)
                      // }}

                      onClick={() => {
                        Swal.fire({
                          title: "Warning!",
                          text: "Do you want to delete the Employee?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteEmployee(employee.id);
                          } else {
                          }
                        });
                      }}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
