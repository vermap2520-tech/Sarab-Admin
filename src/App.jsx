import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./Layout/DashboardLayout";
import Products from "./Pages/Products";
import "./App.css";
import Users from "./Pages/Users";
import AdminLogin from "./Pages/Auth/AdminLogin";
import RegisterAdmin from "./Pages/Auth/RegisterAdmin";
import Admins from "./Pages/Admins";
import ViewAdmin from "./Pages/ViewAdmin";
import UpdateAdmin from "./Pages/UpdateAdmin";
import ViewProduct from "./Pages/ViewProduct";
import UpdateProduct from "./Pages/UpdateProduct";
import ViewUser from "./Pages/ViewUser";
import UpdateUser from "./Pages/UpdateUser";
import AddProduct from "./Components/addProduct";
import Reservation from "./Pages/Reservation";
import AddReservation from "./Components/addReservation";
import AddAdmin from "./Components/addAdmin";
import Contacts from "./Pages/Contacts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/registerAdmin" element={<RegisterAdmin />} />
          <Route path="/" element={<DashboardLayout />}>

            <Route path="product" element={<Products />} />
            <Route path="viewProduct/:id" element={<ViewProduct />} />
            <Route path="updateProduct/:id" element={<UpdateProduct />} />
            <Route path="add" element={<AddProduct />} />

            <Route path="users" element={<Users />} />
            <Route path="view/:id" element={<ViewUser />} />
            <Route path="update/:id" element={<UpdateUser />} />

            <Route path="admins" element={<Admins />} />
            <Route path="viewAdmin/:id" element={<ViewAdmin />} />
            <Route path="updateAdmin/:id" element={<UpdateAdmin />} />
            <Route path="addAdmin" element={<AddAdmin />} />

            <Route path="reservation" element={<Reservation />} />
            <Route path="reservation/add" element={<AddReservation />} />

            <Route path="/contacts" element={<Contacts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
