import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
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

export const UpdateCustomer = () => {
  const { id } = useParams()
  const classes = useStyles();

  const [Designation, setDesignation] = useState("")
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [Email, setEmail] = useState("")
  const [Address, setAddress] = useState("")
  const [DOB, setDOB] = useState(null)
  let navigate = useNavigate()

  async function getCustomerDetails() {
    try {

      const res = await axios.get(`http://localhost:8089/customer/${id}`);
      setDesignation(res.data.designation)
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
      setAddress(res.data.address);
      const unformattedDOB = res.data.dob;
      const formattedDOB = unformattedDOB.substring(0, 10);
      setDOB(formattedDOB);

    } catch (error) {
      console.error(error)
    }

    // await axios.get(`http://localhost:8089/customer/${id}`)
    //   .then(res => setCustomer(res.data))
    //   .catch(err => console.error(err))
  }

  async function updateCustomerDetails() {

    try {

      const formattedDOB = `${DOB}T00:00:00.000Z`
      await axios.patch(`http://localhost:8089/customer/update/${id}`, {
        FirstName, LastName, Designation, Address, Email, DOB: formattedDOB
      });

      Swal.fire({
        title: 'Updated Successfully',
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCustomerDetails()
  }, [])

  return (
    <div className={classes.wrapper} style={{ background: "url(/images/cusEmp/RegisterCustomer.jpg)" }}>
      <div className={classes.edge}>
        <div className={classes.content} style={{ backgroundColor: "white", paddingTop: "5%", paddingBottom: "5%", borderRadius: "15px" }}>
          <form
            onSubmit={() => {
              updateCustomerDetails();
              navigate('/get-all-customers')
            }}
          >

            <h1 style={{ marginLeft: "13%" }}> Update Customer Details </h1>  <br /><br />

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
                value={FirstName}
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
                value={LastName}
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
                type="email"
                id="filled-full-width"
                label="Email"
                placeholder="Input email address"
                value={Email}
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
                label="Address"
                placeholder="Enter your address here"
                value={Address}
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
                id="date"
                label="Birthday"
                variant="filled"
                type="date"
                value={DOB}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setDOB(e.target.value)
                }}
              />
            </div>
            <Button type="submit" className={classes.textField} variant="outlined" color="primary" style={{ marginLeft: "40%", width: "20%", marginTop: "5%" }}>
              UPDATE
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
