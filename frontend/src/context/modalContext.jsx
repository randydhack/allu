import React, { createContext, useState} from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(null);

  // Closes Modal when click outside of content
  const handleContent = () => {
    setType(null);
    setIsModalOpen(false)
  };

  // Example:
  //   Create toggle function for onClicks to change modal type to show
    const toggleLogin = () => {
      setType("login");
      setIsModalOpen(true)
    };

    const toggleSignUp = () => {
      setType("signup");
      setIsModalOpen(true)
    };


  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        handleContent,
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
