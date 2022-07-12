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

export default function AddProducts() {
  const classes = useStyles();
  const mutation = useCreateItem();

  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      stock: 0,
      reorder_level: 0,
      description: "",
      coverSrc: "",
      catogary: "",

      discount: 0,
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

      fetch("http://localhost:4000/items/create", requestOptions)
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
            <InputLabel>Price</InputLabel>
            <OutlinedInput
              id="price"
              labelWidth={60}
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
          </FormControl>

          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel>Stock </InputLabel>
            <OutlinedInput
              id="stock"
              labelWidth={60}
              type="number"
              onChange={formik.handleChange}
              value={formik.values.stock}
            />
          </FormControl>

          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel>Reorder Level</InputLabel>
            <OutlinedInput
              id="reorder_level"
              labelWidth={60}
              type="number"
              onChange={formik.handleChange}
              value={formik.values.reorder_level}
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

          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel>cover Src</InputLabel>
            <OutlinedInput
              id="coverSrc"
              labelWidth={60}
              onChange={formik.handleChange}
              value={formik.values.coverSrc}
            />
          </FormControl>

          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel>Category</InputLabel>
            <OutlinedInput
              id="catogary"
              labelWidth={60}
              onChange={formik.handleChange}
              value={formik.values.catogary}
            />
          </FormControl>

          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel>Discount</InputLabel>
            <OutlinedInput
              id="discount"
              labelWidth={60}
              type="number"
              onChange={formik.handleChange}
              value={formik.values.discount}
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
