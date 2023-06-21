// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/style.scss";
// import { CartProvider } from "./context/CartProvider";
import { ProductsProvider } from "./context/ProductProvider";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchUser } from "./app/userSlice";

store.dispatch(fetchUser());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ProductsProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ProductsProvider>
  </BrowserRouter>
);
