// Libaries
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

// Utils
import Modal from "./components/utils/Modal";

// Components
import Home from "./components/Home/HomePage";

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
            <Route path="" element={""} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
