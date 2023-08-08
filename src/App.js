// import logo from './logo.svg';
import "./App.css";
import ProductCard from "./components/ProdutCard";
import AddCategory from "./pages/AddCategory";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { Products } from "./pages/product";
import "hover.css";
import ProductAdd from "./pages/ProductAdd";
import ViewCategory from "./pages/ViewCategory";

function App() {
  return (
    // <BrandExample />
    // <ProductCard title="Hello" price={300} image="https://image3.mouthshut.com/images/imagesp/925042346s.jpg"/>
    // <Login />
    // <Register />
    <Routes>
      <Route path="/SecureCart/products" element={<Products />} />
      <Route path="/SecureCart/login" element={<Login />} />
      <Route path="/SecureCart/register" element={<Register />} />
      <Route path="/SecureCart/category/add" element={<AddCategory />} />
      <Route path="/SecureCart/category/view" element={<ViewCategory />} />
      <Route path="/SecureCart/product/add" element={<ProductAdd />} />
    </Routes>
  );
}

export default App;
