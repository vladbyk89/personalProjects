import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import Missing from "./pages/Missing";
import Navbar from "./components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const [viewCart, setViewCart] = useState(false);
  const [isStore, setIsStore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/store") {
      setIsStore(true);
    } else {
      setIsStore(false);
    }
  }, [location]);

  return (
    <div className="App">
      <Navbar isStore={isStore} viewCart={viewCart} setViewCart={setViewCart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/store"
          element={<Store viewCart={viewCart} setViewCart={setViewCart} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
