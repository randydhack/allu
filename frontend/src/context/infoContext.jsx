import React, { createContext, useState } from "react";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [batchDetails, setBatchDetails] = useState(null);
  return (
    <InfoContext.Provider
      value={{
        user,
        setUser,
        batchDetails,
        setBatchDetails,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
