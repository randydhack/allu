// Libaries
import { Route, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";

// Redux Store
import * as sessionActions from "./store/session";

// Context
import { InfoContext } from "./context/infoContext";

// Utils
import Modal from "./components/utils/Modal";

// Components
import Home from "./components/Home/HomePage";
import AccountDetail from "./components/Settings/AccountDetails/AccountDetail";
import OrderHistory from "./components/Settings/OrderHistory/OrderHistory";
import SideNavigation from "./components/Settings/SideNavigation/SideNavigation";
import ChangeEmail from "./components/Settings/ChangeEmail/ChangeEmail";
import ChangePassword from "./components/Settings/ChangePassword/ChangePassword";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navigation/Navbar";
import PickupAndDelivery from "./components/PickupAndDelivery/PickupAndDelivery";
import OurDesigns from "./components/OurDesigns/OurDesigns";
import Product from "./components/Product/Product";
import Checkout from "./components/Checkout/Checkout";

// CSS
import "./components/utils/DefaultStyles.scss";
import "./components/Settings/Settings.scss";

// Settings Wrapper
const SettingsWrapper = ({ children }) => (
  <div className="container">
    <div className="setting__container">
      <SideNavigation />
      {children}
    </div>
  </div>
);

// Main App
function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const { user, setUser } = useContext(InfoContext);

  useEffect(() => {
    (async () => {
      const session = await dispatch(sessionActions.restoreUser());
      if (session.user) setUser(session);
      setIsLoaded(true);
    })();
  }, [dispatch, setUser]);

  // Add your routes here, and follow the formatting
  return (
    <>
      {isLoaded && (
        <div className="container">
          <Modal />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/account-details"
              element={
                <SettingsWrapper>
                  <AccountDetail />
                </SettingsWrapper>
              }
            />
            <Route
              path="/order-history"
              element={
                <SettingsWrapper>
                  <OrderHistory />
                </SettingsWrapper>
              }
            />
            <Route
              path="/change-email"
              element={
                <SettingsWrapper>
                  <ChangeEmail />
                </SettingsWrapper>
              }
            />
            <Route
              path="/change-password"
              element={
                <SettingsWrapper>
                  <ChangePassword />
                </SettingsWrapper>
              }
            />
            <Route path="/shipping-information" element={<PickupAndDelivery />} />
            <Route path="/our-designs" element={<OurDesigns />} />
            <Route path="/product" element={<Product />} />

            {/* USER MUST BE LOGGED IN TO VIEW THESE ROUTES */}
            {user && (
              <>
                <Route
                  path="/account-details"
                  element={
                    <SettingsWrapper>
                      <AccountDetail />
                    </SettingsWrapper>
                  }
                />
                <Route
                  path="/order-history"
                  element={
                    <SettingsWrapper>
                      <OrderHistory />
                    </SettingsWrapper>
                  }
                />
                <Route
                  path="/change-email"
                  element={
                    <SettingsWrapper>
                      <ChangeEmail />
                    </SettingsWrapper>
                  }
                />
                <Route
                  path="/change-password"
                  element={
                    <SettingsWrapper>
                      <ChangePassword />
                    </SettingsWrapper>
                  }
                />
              </>
            )}
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
