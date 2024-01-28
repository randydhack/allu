// Libaries
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// CSS
import "./AccountDetail.scss";
import "../../utils/DefaultStyles.scss";
import "../Settings.scss";
import { InfoContext } from '../../../context/infoContext';


function AccountDetail() {
  const user = useSelector(state => state.session.user)

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");



  return (
        <div className="setting__contents setting__background">
          {/* HEADING */}
          <div className="setting__header__mb">
            <h2 className="setting__header">Account Details</h2>
            <hr className="setting__divider"></hr>
          </div>

          {/* Contents */}
          <div className="account__content__container">
            <div>
              <div>Email Address:</div>
              <div className="font-semibold">johndoe@yahoo.com</div>
            </div>

            {/* Form for updating first name and last name */}
            <div className="account-details">
              <div className="account-field">
                <div>First Name:</div>
                <div
                  id="first_name"
                  className='font-semibold'
                  >{firstName}</div>
              </div>

              <div className="account-field">
                <div>Last Name:</div>
                <div
                  id="last_name"
                  className='font-semibold'
                >{lastName}</div>
              </div>
            </div>

          </div>
        </div>
  );
}

export default AccountDetail;
