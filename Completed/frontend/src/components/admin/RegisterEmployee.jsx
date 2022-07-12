import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
    },
    wrapper: {
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(14)
    },
    content: {
        marginLeft: theme.spacing(20),
        marginRight: theme.spacing(20)
    },
    edge: {
        marginLeft: theme.spacing(20),
        marginRight: theme.spacing(20)
    }
}));

export const RegisterEmployee = () => {

    const classes = useStyles();

    const [Designation, setDesignation] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Address, setAddress] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [DOB, setDOB] = useState(null)
    const [Salary, setSalary] = useState(0)
    const [Position, setPosition] = useState("")
    let navigate = useNavigate()

    async function addEmployeeDetails() {

        if (Password === ConfirmPassword) {

            try {

                const formattedDOB = `${DOB}T00:00:00.000Z`

                const res = await axios.post('http://localhost:8089/employee/register', {
                    FirstName, LastName, Designation, Address, Email, Password, DOB: formattedDOB, Salary, Position
                });


                Swal.fire({
                    title: 'Registered Successfully',
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });

            } catch (error) {
                alert(error);
            }

        } else {
            Swal.fire({
                title: "Passowrds Not Matched!!",
                text: "Please enter your details correctly",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }

    return (
        <div className={classes.wrapper} style={{ background: "url(/images/cusEmp/RegisterCustomer.jpg)" }}>
            <div className={classes.edge}>
                <div className={classes.content} style={{ backgroundColor: "white", paddingTop: "5%", paddingBottom: "5%", borderRadius: "15px" }}>
                    <form
                        onSubmit={() => {
                            addEmployeeDetails();
                            navigate('/')
                        }}
                    >

                        <h1 style={{ marginLeft: "13%" }}> Create an Account </h1>  <br /><br />

                        <div className={classes.textField}>
                            <FormControl component="fieldset" style={{ marginTop: "4%" }}  >
                                <FormLabel component="legend">Designation</FormLabel>
                                <RadioGroup
                                    aria-label="mister"
                                    name="mister"
                                    value={Designation}
                                    onChange={(e) => {
                                        setDesignation(e.target.value)
                                    }}
                                >
                                    <FormControlLabel
                                        value="Mr."
                                        control={<Radio />}
                                        label="Mr."
                                    />
                                    <FormControlLabel
                                        value="Mrs."
                                        control={<Radio />}
                                        label="Mrs."
                                    />
                                    <FormControlLabel
                                        value="Ms."
                                        control={<Radio />}
                                        label="Ms."
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className={classes.root}>
                            <br /><br /><br />
                            <TextField
                                id="filled-full-width"
                                label="First Name"
                                placeholder="Input your first name"
                                fullWidth
                                margin="normal"
                                className={classes.textField}
                                variant="filled"
                                required
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                            />
                        </div>

                        <div className={classes.root}>
                            <TextField
                                id="filled-full-width"
                                label="Last Name"
                                placeholder="Input your last name"
                                fullWidth
                                margin="normal"
                                className={classes.textField}
                                variant="filled"
                                required
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                            />
                        </div>

                        <div className={classes.root}>
                            <TextField
                                id="filled-full-width"
                                label="Address"
                                placeholder="Enter your address here"
                                fullWidth
                                margin="normal"
                                className={classes.textField}
                                variant="filled"
                                required
                                onChange={(e) => {
                                    setAddress(e.target.value)
                                }}
                            />
                        </div>

                        <div className={classes.root}>
                            <TextField
                                type="email"
                                id="filled-full-width"
                                label="Email"
                                placeholder="Input email address"
                                fullWidth
                                margin="normal"
                                className={classes.textField}
                                variant="filled"
                                required
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </div>
                        {/* <div className={classes.root}>
              <TextField
              type = "number"
                id="outlined-full-width"
                label="Phone Number"
                placeholder="Input phone number"
                fullWidth
                margin="normal"
                className={classes.textField}
                variant="outlined"
                required
                onChange={(e)=>{
                  setPhone_no(e.target.value)
                }}
              />
            </div> */}
                        <div className={classes.root}>
                            <TextField
                                id="filled-full-width"
                                label="Password"
                                placeholder="Input a strong password"
                                type="password"
                                fullWidth
                                margin="normal"
                                className={classes.textField}
                                variant="filled"
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </div>
                        <div className={classes.root}>
                            <TextField
                                id="filled-full-width"
                                label="Confirm Password"
                                placeholder="Input the password you have given above"
                                type="password"
                                fullWidth
                                margin="normal"
                                className={classes.textField}
                                variant="filled"
                                required
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }}
                            />
                        </div><br />

                        <div className={classes.root}>
                            <TextField
                                id="date"
                                label="Birthday"
                                variant="filled"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => {
                                    setDOB(e.target.value)
                                }}
                            />
                        </div><br />

                        <div className={classes.root}>
                            <TextField
                                id="salary"
                                label="Salary"
                                variant="filled"
                                type="number"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => {
                                    let iSalary = Number.parseInt(e.target.value)
                                    setSalary(iSalary)
                                }}
                            />
                        </div>

                        <div className={classes.root}>
                            <TextField
                                id="filled-full-width"
                                label="Position"
                                placeholder="Enter Epmloyee's position here"
                                fullWidth
                                margin="normal"
                                className={classes.textField}
                                variant="filled"
                                required
                                onChange={(e) => {
                                    setPosition(e.target.value)
                                }}
                            />
                        </div>

                        <Button type="submit" className={classes.textField} variant="outlined" color="primary" style={{ marginLeft: "40%", width: "20%", marginTop: "5%" }}>
                            SUBMIT
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
