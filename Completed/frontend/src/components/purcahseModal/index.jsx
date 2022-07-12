import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Box, Backdrop, Fade, Button } from "@material-ui/core/";
import { Formik, Field, Form } from "formik";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 2,
    width: 700,
    padding: theme.spacing(2, 4, 3),
  },
}));

export const PurcaseModal = ({ open, handleClose, productID, title }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Box>
            <h2>Place a Order For {title}</h2>
            <br />

            <Formik
              initialValues={{
                amount: 0,
                item_id: productID,
              }}
              onSubmit={async (values) => {
                let reqHeaders = new Headers();
                let raw = JSON.stringify(values);

                let requestOptions = {
                  method: "POST",
                  headers: reqHeaders,
                  body: raw,
                  redirect: "follow",
                };

                fetch("http://localhost:4000/order/place", requestOptions)
                  .then((response) => response.json())
                  .then((result) => {
                    console.log(result);
                    if (result?.error) {
                      alert(result?.details);
                      return;
                    }
                    alert("Payment Successfull");
                  })
                  .catch((error) => console.log("error", error));
              }}
            >
              <Form>
                <Field
                  label="Amount"
                  name="amount"
                  type="number"
                  variant="outlined"
                />

                <br />
                <br />
                <Button variant="contained" color="primary" type="submit">
                  Place Order
                </Button>
              </Form>
            </Formik>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};
