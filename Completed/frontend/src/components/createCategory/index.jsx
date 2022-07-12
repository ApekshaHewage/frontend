import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Card,
  OutlinedInput,
  CardContent,
  Button,
  InputLabel,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useCreateItem } from "../../query-hooks/useCreateItem";

const useStyles = makeStyles({
  root: {},
  margin: {
    marginTop: 20,
  },
});

export default function CreateCategory() {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },

    onSubmit: (values) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(values);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:4000/category/create", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.error) {
            alert(result?.details);
          }
          alert("successfuly added");
          return result;
        });
    },
  });

  return (
    <Card className={classes.root}>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel>Title</InputLabel>
            <OutlinedInput
              id="title"
              labelWidth={60}
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </FormControl>

          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel>Description</InputLabel>
            <OutlinedInput
              id="description"
              labelWidth={60}
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </FormControl>

          <Button
            variant="contained"
            size="large"
            type="submit"
            color="primary"
            className={classes.margin}
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
