import React, { useEffect, useState } from "react";
import FilterPanel from "../../components/Home/FilterPanel";
import List from "../../components/Home/List";
import SearchBar from "../../components/Home/SearchBar";
import "./styles.css";
import useItems from "../../query-hooks/useItems";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import CartDrawer from "../../components/cart/drawer";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  // sort
  const [sortLowPrice, setSortLowPrice] = useState(null);
  const [sortHighPrice, setSortHighPrice] = useState(null);
  const [sortAZ, setSortAZ] = useState(null);
  const [sortZA, setSortZA] = useState(null);

  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
  const items = useItems();

  const [cuisines, setCuisines] = useState([
    { id: 1, checked: false, label: "American" },
    { id: 2, checked: false, label: "Chinese" },
    { id: 3, checked: false, label: "Italian" },
  ]);

  const [list, setList] = useState(items.data);
  const [searchInput, setSearchInput] = useState("");

  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);

  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

  const handleChangeChecked = (id) => {
    const cusinesStateList = cuisines;
    const changeCheckedCuisines = cusinesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCuisines(changeCheckedCuisines);
  };

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = items.data;
    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList?.filter(
        (item) => parseInt(item?.rating) === parseInt(selectedRating)
      );
    }

    // Category Filter
    if (selectedCategory) {
      updatedList = updatedList?.filter(
        (item) => item?.category === selectedCategory
      );
    }

    // sort by Price
    if (sortLowPrice) {
      updatedList = updatedList.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    }

    if (sortHighPrice) {
      updatedList = updatedList.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }

    // sort A-Z
    if (sortAZ) {
      updatedList = updatedList.sort(function (a, b) {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
      });
    }

    if (sortZA) {
      updatedList = updatedList.sort(function (a, b) {
        return b.title < a.title ? -1 : b.title > a.title ? 1 : 0;
      });
    }

    // Cuisine Filter
    const cuisinesChecked = cuisines
      .filter((item) => item?.checked)
      .map((item) => item?.label.toLowerCase());

    if (cuisinesChecked.length) {
      updatedList = updatedList.filter((item) =>
        cuisinesChecked.includes(item?.cuisine)
      );
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item?.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList?.filter(
      (item) => item?.price >= minPrice && item?.price <= maxPrice
    );

    setList(updatedList);
  };

  useEffect(() => {
    setList(items.data);
  }, [items.isSuccess]);

  useEffect(() => {
    applyFilters();
  }, [
    selectedRating,
    selectedCategory,
    cuisines,
    searchInput,
    selectedPrice,
    sortLowPrice,
    sortHighPrice,
    sortAZ,
    sortZA,
  ]);

  const ApplyFilterHandler = () => {
    applyFilters();
  };

  return (
    <div className="home">
      {/* Search Bar
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      /> */}

      <div className="home_panelList-wrap">
        {/* Filter Panel */}
        <div className="home_panel-wrap">
          <FilterPanel
            selectedCategory={selectedCategory}
            selectCategory={handleSelectCategory}
            selectedRating={selectedRating}
            selectedPrice={selectedPrice}
            selectRating={handleSelectRating}
            cuisines={cuisines}
            changeChecked={handleChangeChecked}
            changePrice={handleChangePrice}
          />

          <div className="input-group">
            <p className="label">Sort By Price</p>

            <Button
              variant="outlined"
              onClick={() => setSortLowPrice(true)}
              style={{
                marginRight: 3,
              }}
            >
              Low to High
            </Button>
            <Button
              variant="outlined"
              onClick={() => setSortHighPrice(true)}
              style={{
                marginLeft: 3,
              }}
            >
              High to Low
            </Button>

            <br />
            <br />
            <p className="label">Sort alphabetical order</p>

            <Button
              variant="outlined"
              onClick={() => setSortAZ(true)}
              style={{
                marginRight: 5,
              }}
            >
              A - Z
            </Button>

            <Button
              variant="outlined"
              onClick={() => setSortZA(true)}
              style={{
                marginRight: 5,
              }}
            >
              Z - A
            </Button>

            <br />
            <br />
            <p className="label">Categories</p>

            <Button
              variant="outlined"
              component={Link}
              to="/categories"
              style={{
                marginRight: 5,
              }}
            >
              Categories
            </Button>
          </div>
        </div>
        {/* List & Empty View */}
        <div className="home_list-wrap">
          {items.isLoading && <p>Loading items...</p>}
          {items.isError && <p>Could not fetch items ...</p>}

          {items.isSuccess && (
            <>
              <List
                list={list}
                isLoading={items.isLoading}
                isError={items.isError}
                isSuccess={items.isSuccess}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
