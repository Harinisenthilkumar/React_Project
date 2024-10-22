import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/Vegitarian"
            element={<ShopCategory banner={men_banner} category="Vegitarian" />}
          />
          <Route
            path="/Non-Vegitarian"
            element={
              <ShopCategory banner={women_banner} category="Non-Vegitarian" />
            }
          />
          <Route
            path="/Desserts"
            element={<ShopCategory banner={kids_banner} category="Desserts" />}
          />
          <Route path="/product/:productId" element={<Product />} />

          <Route path="/Cart" element={<Cart />} />
          <Route path="/Login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
