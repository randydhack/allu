// Libaries
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

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

    // console.log(designs.Designs)


  return isLoaded && (
      <div className="design_main">
      <div className="design_image_container">
        <div className='design_headings'>
          <h1>Designs</h1>
          <h2>All designs ({designs.Designs.length})</h2>
        </div>
        <div className='design_divider'></div>
        <div className="design_grid">
          {designs.Designs.map((el, i) => {
            return (
              <div key={`design${i}`}>
                <NavLink to={`/design/${el.id}/product`}>
                <img src={el.design_url} alt={`design-${el.id}`} className="design_image" />
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OurDesigns;
