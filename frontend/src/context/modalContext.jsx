import React, { createContext, useState, useEffect } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState(null);

  // useEffect(() => {

  //     setType(type);
  //     if (type) {
  //       // document.querySelector("html").style.overflowY = "hidden";
  //       document.body.style.overflowY = 'auto'
  //     }

  //   return () => {
  //     document.querySelector("html").style.overflow = null;
  //   };
  // }, [type]);

  // Closes Modal when click outside of content
  const handleContent = () => {
    setType(null);
    setIsModalOpen(false);
  };

  // Example:
  //   Create toggle function for onClicks to change modal type to show
  const toggleLogin = () => {
    setIsModalOpen(true);
    setType("login");
  };

  const toggleSignUp = () => {
    setType("signup");
    setIsModalOpen(true);
  };
  // const toggleEditBatchModal = () => {
  //   setType("editBatch");
  //   setIsModalOpen(true);
  // };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        handleContent,
        type,
        setType,
        toggleLogin,
        toggleSignUp,
        // toggleEditBatchModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
