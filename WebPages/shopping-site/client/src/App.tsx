import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Store from "./pages/Store";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import Navbar from "./components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Register from "./pages/Register";
import axios from "axios";

interface Address {
  country: string;
  city: string;
  street: string;
  postCode: string;
}

export interface User {
  cardId: string;
  email: string;
  password: string;
  userName: string;
  _id: string;
  address: Address;
}

const initUser: User = {
  cardId: "12233",
  email: "vladb89@gmail.com",
  password: "12345678",
  userName: "vladb89",
  _id: "87654321",
  address: {
    country: "The Netherlands",
    city: "Herenveen",
    street: "Valeriaan 2",
    postCode: "8446BD",
  },
};

function App() {
  const [viewCart, setViewCart] = useState(false);
  const [isStore, setIsStore] = useState(false);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(initUser);

  useEffect(() => {
    if (location.pathname === "/store") {
      setIsStore(true);
    } else {
      setIsStore(false);
    }
  }, [location]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("api/v1/users/getUser");
      const user = await data.user;
      setCurrentUser((prev) => (prev = user));
    };

    fetch();
  }, []);

  return (
    <div className="App">
      <Navbar
        isStore={isStore}
        viewCart={viewCart}
        setViewCart={setViewCart}
        currentUser={currentUser}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/store"
          element={<Store viewCart={viewCart} setViewCart={setViewCart} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={<Profile currentUser={currentUser} />}
        />
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
