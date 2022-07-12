import { PageHeader } from "../components/Header";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useCatogaries from "../query-hooks/usecategories";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: { minWidth: 275, marginTop: 30 },

  layout: {
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export const Categories = () => {
  const classes = useStyles();
  const categories = useCatogaries();
  return (
    <>
      <PageHeader title={"Categories"} />
      <main className={classes.layout}>
        {categories.isLoading && <p>Loading...</p>}
        {categories.isError && <p>Could not fetch data ...</p>}

        {categories.isSuccess && (
          <>
            {categories.data.map((item) => {
              return (
                <>
                  <Card className={classes.root} variant="outlined">
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        Categories
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {item?.title}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {item?.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        component={Link}
                        to={`/category/${item?.title}`}
                      >
                        Products
                      </Button>
                    </CardActions>
                  </Card>
                </>
              );
            })}
          </>
        )}
      </main>
    </>
  );
};
