
import { useContext } from "react";

// Default stylings
import { style } from "../utils/styles";
import { ModalContext } from "../../context/modalContext";


function Home() {

  const {toggleLogin} = useContext(ModalContext)


  return <div style={style.example}>
    <div>
      <button onClick={(e) => toggleLogin()}>opens up modal example</button>
    </div>
  </div>;
}

export default Home;
