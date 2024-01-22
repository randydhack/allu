import React, { createContext, useState} from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(null);

  // Example:
  //   Create toggle function for onClicks to change modal type to show
    const toggleLogin = () => {
      setType("login");
    };

    const toggleSignUp = () => {
      setType("signup");
    };


  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        type,
        setType,
        toggleLogin,
        toggleSignUp
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
