// Libaries
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// CSS
import "./AccountDetail.scss";
import "../../utils/DefaultStyles.scss";
import "../Settings.scss";
import { InfoContext } from "../../../context/infoContext";
import { restoreUser } from "../../../store/session";

function AccountDetail() {
  const dispatch = useDispatch();
  const { setUser } = useContext(InfoContext);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      const session = await dispatch(restoreUser());
      if (session.user) setUser(session.user);
    })();
  }, [setUser]);

  return (
    user && (
      <div className="setting__contents setting__background">
        {/* HEADING */}
        <div className="setting__header__mb">
          <h1 className="setting__header" aria-label="Account Details Heading">
            Account Details
          </h1>
        </div>

        {/* Contents */}
        <div className="account__content__container">
          <div>
            <div>Email Address:</div>
            <div className="font-semibold">{user.email}</div>
          </div>

          {/* Form for updating first name and last name */}
          <div className="account-details">
            <div className="account-field">
              <div>First Name:</div>
              <div id="first_name" className="font-semibold">
                {user.firstName}
              </div>
            </div>

            <div className="account-field">
              <div>Last Name:</div>
              <div id="last_name" className="font-semibold">
                {user.lastName}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default AccountDetail;
