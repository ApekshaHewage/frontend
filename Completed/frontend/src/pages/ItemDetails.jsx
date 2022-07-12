import {
  Button,
  List,
  Divider,
  ListItemText,
  ListItem,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import useItem from "../query-hooks/useItem";
import { PurcaseModal } from "../components/purcahseModal/index";
import { useState } from "react";
import { useStyles } from "../styles/dashboard";
import { PageHeader } from "../components/Header";
import { useCart } from "react-use-cart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { IconButton } from "@material-ui/core";
import { getUpdatedPrice } from "../utils/getUpdatedPrice";

export const ItemDetails = () => {
  const { addItem } = useCart();
  const classes = useStyles();
  const { slug } = useParams();
  const ItemDetails = useItem(slug);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PurcaseModal
        open={open}
        handleClose={handleClose}
        productID={ItemDetails.data?.id}
        title={ItemDetails.data?.title}
      />
      <PageHeader title={ItemDetails.data?.title} />

      <main className={classes.layout}>
        <Card className={classes.paper}>
          <CardMedia
            component="img"
            height="400"
            image={ItemDetails.data?.coverSrc}
            alt={ItemDetails.data?.title}
          />

          <CardContent>
            <Typography gutterBottom variant="h3" component="h2">
              {ItemDetails.data?.title}
            </Typography>

            <Typography gutterBottom variant="h6" component="p">
              {ItemDetails.data?.description}
            </Typography>

            <List
              component="nav"
              className={classes.root}
              aria-label="more details"
            >
              {ItemDetails.data?.discount > 0 ? (
                <ListItem button>
                  <ListItemText>
                    <s> {ItemDetails.data?.price} </s> RS
                    <b> {ItemDetails.data?.discount}% off</b>
                  </ListItemText>

                  <Typography gutterBottom variant="h6" component="p">
                    {getUpdatedPrice(
                      ItemDetails.data?.price,
                      ItemDetails.data?.discount
                    )}
                    RS
                  </Typography>
                </ListItem>
              ) : (
                <>
                  <ListItem button>
                    <ListItemText
                      primary={`Price : ${ItemDetails.data?.price}`}
                    />
                  </ListItem>
                </>
              )}
              <Divider />
              <ListItem button divider>
                <ListItemText primary={`Stock : ${ItemDetails.data?.stock}`} />
              </ListItem>
            </List>
          </CardContent>

          {ItemDetails.isLoading && <p>Loading...</p>}
          {ItemDetails.isError && <p>Could not fetch data ...</p>}

          {ItemDetails.isSuccess && (
            <CardActions
              style={{
                padding: 20,
              }}
            >
              <Button
                color="primary"
                size="large"
                onClick={handleOpen}
                variant="contained"
              >
                Buy Now
              </Button>

              <Button
                onClick={() => addItem(ItemDetails.data)}
                color="primary"
                size="large"
              >
                Add to Cart
              </Button>
            </CardActions>
          )}
        </Card>
      </main>
    </>
  );
};
