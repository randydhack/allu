
import { useContext } from "react";

// Default stylings
import { style } from "../utils/styles";
import { ModalContext } from "../../context/modalContext";


function Home() {

  const {toggleLogin, toggleSignUp} = useContext(ModalContext)


  return <div style={style.example}>
    <div>
      <button onClick={(e) => toggleLogin()}>opens up login modal</button>
      <button onClick={(e) => toggleSignUp()}>opens up sign up modal</button>

    </div>
  </div>;
}

export default Home;
