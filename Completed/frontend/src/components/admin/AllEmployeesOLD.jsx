import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';


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
        await axios.get('http://localhost:8089/getEmployee')
            .then(res => setEmployees(res.data))
            .catch(err => console.error(err))

        // comment below code immediately and uncomment the above code segment
        // setEmployees([
        //     {
        //         firstName: 'first',
        //         lastName: 'last',
        //         designation: 'designation',
        //         address: 'address',
        //         email: 'email@address.com',
        //         password: 'password',
        //         dob: '02/07/2022',
        //         salary: 2400
        //     }
        // ])
    }

    async function deleteEmployee(id) {
        await axios.delete(`http://localhost:8089/deleteEmployee/${id}`)
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
    const classes = useStyles();


    return (
      <div>
        <TableContainer>
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
                <StyledTableCell align="center">Update</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.name}>
                  <TableCell component="th" scope="row" align="center">
                    {employee.firstName}
                  </TableCell>
                  <TableCell align="center">{employee.lastName}</TableCell>
                  <TableCell align="center">{employee.designation}</TableCell>
                  <TableCell align="center">{employee.address}</TableCell>
                  <TableCell align="center">{employee.email}</TableCell>
                  <TableCell align="center">{employee.dob}</TableCell>
                  <TableCell align="center">{employee.salary}</TableCell>
                  <TableCell align="center">
                    <Button color='primary' variant='contained'
                      onClick={() => {
                        navigate(`/updateEmployee/${employee.id}`);
                      }}
                    >
                      UPDATE
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button color="secondary"
                       variant='contained'
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
}
