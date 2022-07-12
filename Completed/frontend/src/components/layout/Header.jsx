import React, { Fragment, useEffect } from 'react'
import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2';
import DashboardIcon from "@material-ui/icons/Dashboard"
import CartDrawer from '../cart/drawer';
import SearchIcon from "@material-ui/icons/Search";
import './style.css';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home'

import "../Home/SearchBar/styles.css"
import SearchBar from '../Home/SearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title1: {
    flexGrow: 10,
  },
  title2: {
    flexGrow: 10,
  },
  title3: {
    flexGrow: 10,
  },
  title4: {
    flexGrow: 10,
  },
  title5: {
    flexGrow: 150,
  }
}));


export const Header = ({ value, changeInput }) => {
  const classes = useStyles();

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {

    try {
      const jwt = localStorage.getItem("token");
      setUser(jwtDecode(jwt));
    } catch (error) {

    }
  }, []);

  function logout() {
    localStorage.clear();
    Swal.fire({
      title: 'Logged Out Successfully',
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    }).then((value) => {
      Swal.fire((window.location = "/"));
    });

  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => { navigate('/') }}>
            <HomeIcon />
          </IconButton>
          {/* <Typography variant='h6' className={classes.title2} >
            <a href='#' style={{ textDecoration: "none", color: "white" }}>        </a>
          </Typography>
          <Typography variant='h6' className={classes.title3}>
            <a href="#" style={{ textDecoration: "none", color: "white" }}>        </a>
          </Typography>
          <Typography variant='h6' className={classes.title4}>
            <a href="#" style={{ textDecoration: "none", color: "white" }}>        </a>
          </Typography>
          <Typography variant='h6' className={classes.title5}>
            <a href="#" style={{ textDecoration: "none", color: "white" }}>        </a>
          </Typography> */}
          {/* 
          <div className="searchBar-wrap">
            <SearchIcon className="searchBar-icon" />
            <input
              type="text"
              placeholder="Woodland Hills"
              value={value}
              onChange={changeInput}
            />

            <CartDrawer />
            <Link to="/dashboard">
              <IconButton>
                <DashboardIcon />
              </IconButton>
            </Link>
          </div> */}

          <div className='search'> <SearchBar /></div>


          {localStorage.getItem("token") ?
            <>
              {user.Email + " "}


              <Button style={{ marginLeft: "1%" }} color="secondary" variant='contained' onClick={logout}>Log Out</Button>
            </>
            :
            <>

              <Button color="primary" variant='contained' className={classes.menuButton}
                onClick={() => { navigate("/login") }}
              > Login </Button>
              <Button color="secondary" variant='contained' onClick={() => { navigate("/register-customer") }}>Sign Up</Button>

            </>}

        </Toolbar>
      </AppBar>
    </div>
  );
}
