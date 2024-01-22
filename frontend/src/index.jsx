// Packages
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Context
import { ModalProvider } from "./context/modalContext";

// CSS
import "./index.scss";
// App
import App from "./App";


// React developer tool, if not in production. Used for debugging
if (process.env.NODE_ENV !== "production") {
  // window.store = store;
}
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
root.render(
    <ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModalProvider>
);
