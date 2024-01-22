// Libaries
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

// Utils
import Modal from "./components/utils/Modal";

// Components
import Home from "./components/Home/HomePage";
import AccountDetail from "./components/Settings/AccountDetails/AccountDetail";

function App() {
  const [isLoaded, setIsLoaded] = useState(true);

  // Add your routes here, and follow the formatting
  return (
    <>
      {isLoaded && (
        <>
          <Modal />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/account-details" element={<AccountDetail />} /> {/* Path will be more specific, leave for now*/}

            <Route path="" element={""} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
