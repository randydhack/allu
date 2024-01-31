// Libaries
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';

// CSS
import "../utils/DefaultStyles.scss";
import "./OurDesigns.scss";

// Redux Store
import { getDesigns } from "../../store/designReducer";



function OurDesigns() {

    const dispatch = useDispatch()

    const isLoaded = useSelector(state => state.designs.isLoaded)
    const designs = useSelector(state => state.designs.allDesigns)

    useEffect(() => {

        (async () => {
            await dispatch(getDesigns())
        })()

    }, [dispatch])

    console.log(designs.Designs)


  return isLoaded && (
      <div className="design_main">
      <div className="design_image_container">
        <div className="design_grid">
          {designs.Designs.map((el, i) => {
            return (
              <div key={`design${i}`}>

                <img src={el.design_url} alt="image" className="design_image" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OurDesigns;
