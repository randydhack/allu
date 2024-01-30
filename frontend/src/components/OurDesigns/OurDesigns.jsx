import React from "react";

// CSS
import "../utils/DefaultStyles.scss";
import "./OurDesigns.scss";

// DATA
import { fakeData } from "./fakedata";

function OurDesigns() {
  return (
    <div className="design_main">
      <div className="design_image_container">
        <div className="design_grid">
          {fakeData.map((el) => {
            return (
              <div>
                <img src={el.image} alt="image" className="design_image" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OurDesigns;
