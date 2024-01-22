import { useContext } from "react";

// Default stylings
import { ModalContext } from "../../context/modalContext";


function Home() {

  const {toggleLogin, toggleSignUp} = useContext(ModalContext)


  return <div>
    <div>
      <button onClick={(e) => toggleLogin()}>opens up login modal</button>
      <button onClick={(e) => toggleSignUp()}>opens up sign up modal</button>
    </div>
  </div>;
}

export default Home;
