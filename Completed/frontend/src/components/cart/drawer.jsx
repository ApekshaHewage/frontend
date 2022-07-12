import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Drawer, IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cart from "./cart";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  list: {
    width: 500,
    padding: 40,
  },
  fullList: {
    width: "auto",
  },
});

export default function CartDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <IconButton onClick={toggleDrawer(anchor, false)}>
        <CloseIcon />
      </IconButton>

      <br />
      <br />
      <Cart />
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer("right", true)}>
          <ShoppingCartIcon size="small" />
        </IconButton>

        <Drawer
          anchor={"right"}
          open={state["right"]}
          onOpen={toggleDrawer("right", true)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
