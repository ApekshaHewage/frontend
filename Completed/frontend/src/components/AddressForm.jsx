import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useState } from "react";

const initialValues = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: 3,
  country: '',
}

const AddressForm = () => {
  const [values, setValues] = useState(initialValues);
  // const [file, setFile] = useState(null);
  const [FormErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const pasregex = /[a-zA-Z]/;

    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    } else if (values.firstName.length < 4) {
      errors.firstName = "First Name must be more than 4 characters";
    } else if (values.firstName.length > 20) {
      errors.firstName = "First Name cannot exceed 15 characters";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Paassword is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password is too short!";
    } else if (!pasregex.test(values.password)) {
      errors.password = 'Must contain atleast one alphabhetic character'
    }

    if (!values.role) {
      errors.role = "role is required";
    }

    if (!values.position) {
      errors.position = "Position is required";
    }

    if (!values.companyID) {
      errors.companyID = "Company ID is required!";
    } else if (values.companyID.length !== 8) {
      errors.companyID = "ID must consist of exactly 8 characters";
    }

    return errors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate(values));
    setIsSubmit(true);
  }

  //Changing upon errors
  // useEffect(() => {
  //   if (Object.keys(FormErrors).length === 0 && isSubmit) {
  //     AddUser();
  //   }
  // }, [FormErrors]);


  //updating values
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const enable = values.firstName && values.email && values.role && values.password && values.companyID && values.position;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidthsu
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;

