import { useContext } from "react";

import { ModalContext } from "../../context/modalContext";
import LoginModal from "../Modals/LoginModal";
import SignUpModal from "../Modals/SignUpModal"
import './modal.css'

export default function Modal(props) {
    const { type, handleContent } = useContext(ModalContext);

    let content = null;

    // // Allows ESC key to close modal
    // useEffect(() => {
    //   const handleEsc = (event) => {
    //     if (event.keyCode === 27) handleContent();
    //   };
    //   window.addEventListener("keydown", handleEsc);

    //   return () => {
    //     window.removeEventListener("keydown", handleEsc);
    //   };
    // }, []);

    if (type) {
      content = (
        <div className="modalWrapper">
          <div className="modalContent">
            <div className="closeButtonWrapper"></div>
            {/* EXAMPLE HOW TO SET UP A MODAL PAGE */}
            {type === "login" && <LoginModal />}
            {type === "signup" && <SignUpModal />}

          </div>
          <div className="modalBackdrop" onClick={handleContent} />
        </div>
      );
    }
    return <>{content}</>;
  }
