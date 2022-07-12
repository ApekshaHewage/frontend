import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useCart } from "react-use-cart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
  Button,
  IconButton,
  List,
  ListItemText,
  ListItem as TheListItem,
} from "@material-ui/core";
import { getUpdatedPrice } from "../../../../utils/getUpdatedPrice";

const ListItem = ({ item }) => {
  const { addItem } = useCart();

  return (
    <div className="listItem-wrap">
      <Link to={`/item/${item?.id}`}>
        <img src={item.coverSrc} alt="" />
      </Link>
      <header>
        <h4>{item.title}</h4>
      </header>
      <footer>
        <p>
          <b>{item?.description}</b>
        </p>

        <p>
          {item?.discount > 0 ? (
            <>
              <List>
                <TheListItem>
                  <ListItemText>
                    <s> {item?.price} </s> RS
                    <b> {item?.discount}% off</b>
                  </ListItemText>
                </TheListItem>

                <TheListItem>
                  <ListItemText>
                    <b
                      style={{
                        fontSize: 17,
                      }}
                    >
                      {getUpdatedPrice(item?.price, item?.discount)} RS{" "}
                    </b>
                  </ListItemText>
                </TheListItem>
              </List>
            </>
          ) : (
            <>
              <b>${item?.price}</b>
            </>
          )}
        </p>

        <IconButton onClick={() => addItem(item)} color="black">
          <AddShoppingCartIcon fontSize="small" />
        </IconButton>
      </footer>
    </div>
  );
};

export default ListItem;
