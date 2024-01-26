// Packages
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './store/index';
import { BrowserRouter } from "react-router-dom";

// Context
import { ModalProvider } from "./context/modalContext";

// CSS
import "./index.scss";
// App
import App from "./App";
import { restoreCSRF } from "./store/csrf";


// React developer tool, if not in production. Used for debugging
if (process.env.NODE_ENV !== "production") {
  restoreCSRF()
  // window.store = store;
}
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
root.render(
  <Provider store={store}>
    <ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModalProvider>
    </Provider>
);
