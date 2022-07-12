// react router
import { useRoutes } from "react-router-dom";
// pages
import Home from "./pages/Home";
import { ItemDetails } from "./pages/ItemDetails";
import { Dashboard } from "./pages/Dashboard";
import { CheckOut } from "./pages/checkout";
import { Categories } from "./pages/Categories";
import { CategorieDetails } from "./pages/CategorieDetails";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AllCustomers } from "./components/admin/AllCustomers";
import { AllEmployees } from "./components/admin/AllEmployees";
import { RegisterEmployee } from "./components/admin/RegisterEmployee";
import { UpdateEmployee } from "./components/admin/UpdateEmployee";
import { ForgetPasswordPage } from "./components/customer/ForgetPasswordPage";
import { Login } from "./components/customer/Login";
import { UpdateCustomer } from "./components/customer/UpdateCustomer";
import { LoginEmployee } from "./components/employee/LoginEmployee";
import { RegisterCustomer } from "./components/customer/RegisterCustomer";

export const ApplicationRouter = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/item/:slug",
      element: <ItemDetails />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/categories",
      element: <Categories />,
    },
    {
      path: "/category/:slug",
      element: <CategorieDetails />,
    },
    {
      path: "/checkout",
      element: <CheckOut />,
    },
    {
      path: "/admin-home",
      element: <AdminDashboard />,
    },
    {
      path: "/get-all-customers",
      element: <AllCustomers />,
    },
    {
      path: "/get-all-employees",
      element: <AllEmployees />,
    },
    {
      path: "/register-employee",
      element: <RegisterEmployee />,
    },
    {
      path: "/updateEmployee/:id",
      element: <UpdateEmployee />,
    },
    {
      path: "/forget-password",
      element: <ForgetPasswordPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register-customer",
      element: <RegisterCustomer />,
    },
    {
      path: "/updateCustomer/:id",
      element: <UpdateCustomer />,
    },
    {
      path: "/loginEmployee",
      element: <LoginEmployee />,
    },
  ]);

  return routes;
};
