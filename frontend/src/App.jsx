// Libaries
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

// Utils
import Modal from "./components/utils/Modal";

// Components
import Home from "./components/Home/HomePage";
import AccountDetail from "./components/Settings/AccountDetails/AccountDetail";
import OrderHistory from "./components/Settings/OrderHistory/OrderHistory";
import SideNavigation from "./components/Settings/SideNavigation/SideNavigation";
import ChangeEmail from "./components/Settings/ChangeEmail/ChangeEmail";
import ChangePassword from "./components/Settings/ChangePassword/ChangePassword";

// CSS
import "./components/utils/DefaultStyles.scss";
import "./components/Settings/Settings.scss";
import Navbar from "./components/Navigation/Navbar";

// Settings Wrapper
const SettingsWrapper = ({ children }) => (
  <div className="container">
    <div className="setting__container">
      <SideNavigation />
      {children}
    </div>
  </div>
);

function App() {
  const [isLoaded, setIsLoaded] = useState(true);

  // Add your routes here, and follow the formatting
  return (
    <>
      {isLoaded && (
        <>
          <Modal />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/account-details" element={<SettingsWrapper><AccountDetail /></SettingsWrapper>} />
            <Route path="/order-history" element={<SettingsWrapper><OrderHistory /></SettingsWrapper>} />
            <Route path="/change-email" element={<SettingsWrapper><ChangeEmail /></SettingsWrapper>} />
            <Route path="/change-password" element={<SettingsWrapper><ChangePassword /></SettingsWrapper>} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
