// Libaries
import React from "react";
import { useDispatch, useSelector } from 'react-redux';

// CSS
import "./AccountDetail.scss";
import "../../utils/DefaultStyles.scss";
import "../Settings.scss";
import { increment, decrement, incrementByAmount } from "../../../store/counterSlice"

// Components
import SideNavigation from "../SideNavigation/SideNavigation";

function AccountDetail() {


// For Testing
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.value);

//

  return (
    <div className="container">
      <div className="setting__container">
        <SideNavigation />
        <div className="setting__contents setting__background">
          {/* HEADING */}
          <div className="setting__header__mb">
            <h2 className="setting__header">Account Details</h2>
            <hr className="setting__divider"></hr>
          </div>

          {/* Contents */}
          <div className="account-form__content__container">
            <div>
              <div>Email Address</div>
              <div className="font-light">johndoe@yahoo.com</div>
            </div>

            <form className="account-form" onSubmit={''}>
              <div className="account-form__field">
                <label htmlFor="first_name">First Name</label>
                <input type="text" id="first_name" name="first_name" className="account-form__input"/>
              </div>

              <div className="account-form__field">
                <label htmlFor="last_name">Last Name</label>
                <input type="text" id="last_name" name="last_name" className="account-form__input"/>
              </div>
            </form>
          </div>
          <div>{count}</div>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
        </div>
      </div>
    </div>
  );
}

export default AccountDetail;
