import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useStyles } from "../styles/dashboard";

export const PageHeader = ({ title }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <IconButton aria-label="delete">
              <ArrowBackIcon />
            </IconButton>
          </Link>

          <Typography variant="h6" color="inherit" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
