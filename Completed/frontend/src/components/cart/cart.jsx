import { CartProvider, useCart } from "react-use-cart";
import {
  List,
  ListItem,
  Button,
  Divider,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";

export default function Cart() {
  const { isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } =
    useCart();

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <>
      <h1>Cart ({totalUniqueItems})</h1>

      <List
        style={{
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={`${item.quantity} x ${item?.title}`} />

            <Link to={`/item/${item.id}`}>
              <Button variant="contained" color="primary">
                View
              </Button>
            </Link>

            <IconButton
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Formik
              initialValues={{
                amount: 0,
              }}
              onSubmit={async (values) => {
                updateItemQuantity(item.id, item.quantity + values.amount);
              }}
            >
              <Form>
                <Field
                  id="amount"
                  name="amount"
                  type="number"
                  style={{
                    width: 50,
                  }}
                />

                <IconButton type="submit">
                  <AddIcon fontSize="small" />
                </IconButton>
              </Form>
            </Formik>

            <IconButton onClick={() => removeItem(item.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <Link to="/checkout">
        <Button
          size="large"
          variant="contained"
          color="primary"
          style={{
            marginTop: 40,
          }}
        >
          Check Out
        </Button>
      </Link>
    </>
  );
}
