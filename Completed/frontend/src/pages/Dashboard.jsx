import { useStyles } from "../styles/dashboard";
import { PageHeader } from "../components/Header";
import { CategoryDetails } from "../components/categoryTable";

// components
import AddProducts from "../components/addProduct";
import { ProductDetails } from "../components/productDetails";
import CreateCategory from "../components/createCategory";

export const Dashboard = () => {
  const classes = useStyles();

  return (
    <>
      <PageHeader title={"Dashboard"} />

      <main
        className={classes.layout}
        style={{ marginTop: 50, marginBottom: 50 }}
      >
        <h1> Products </h1>

        <br />
        <ProductDetails />

        <h1
          style={{
            marginTop: 40,
          }}
        >
          Categories
        </h1>

        <br />
        <CategoryDetails />

        <h1
          style={{
            marginTop: 40,
          }}
        >
          Add new Product
        </h1>

        <br />
        <AddProducts />

        <h1
          style={{
            marginTop: 40,
          }}
        >
          Create New Category
        </h1>

        <br />
        <CreateCategory />
      </main>
    </>
  );
};
