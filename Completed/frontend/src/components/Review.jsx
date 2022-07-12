import React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useCart } from "react-use-cart";
import { getUpdatedPrice } from "../utils/getUpdatedPrice";

export default function Review() {
  const { items } = useCart();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={`${item.quantity} x ${item?.title}`} />
            {item?.discount > 0 ? (
              <>
                <br />
                <Typography variant="body2">
                  <b> {item?.discount} % off </b>
                  <br />
                  <s>{item?.price} RS </s>
                  <br />
                  <b
                    style={{
                      fontSize: 17,
                    }}
                  >
                    {getUpdatedPrice(item?.price, item?.discount)} RS{" "}
                  </b>
                </Typography>
              </>
            ) : (
              <Typography variant="body2">{item.price}</Typography>
            )}
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
