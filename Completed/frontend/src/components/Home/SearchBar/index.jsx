import React from "react";
import "./styles.css";
import SearchIcon from "@material-ui/icons/Search";
import CartDrawer from "../../cart/drawer";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

const SearchBar = ({ value, changeInput }) => (
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
  </div>
);

export default SearchBar;
