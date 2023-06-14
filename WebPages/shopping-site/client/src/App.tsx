import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import Missing from "./pages/Missing";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";

function App() {
  const [viewCart, setViewCart] = useState(false);

  return (
    <div className="App">
      <Navbar setViewCart={setViewCart}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store viewCart={viewCart} setViewCart={setViewCart}/>} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
