import { useState } from "react";

function PickupForm({ formInfo, formChange }) {


  return (
    <>
      {/* FORM SECTION */}
        <div className="form_field_container">
          {/* ------------------- Left ------------------- */}
          <div className="form-left-panel">
            <div className="form-field">
            <label htmlFor="firstName">First Name</label>
              <input required type="text" name="firstName" id="firstName" onChange={formChange} value={formInfo["firstName"] || ""}/>
            </div>
            <div className="form-field">
              <label htmlFor="phone-number">Phone</label>
              <input required type="number" name="phone" id="phone" onChange={formChange} value={formInfo["phone"] || ''}/>
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input required type="email" name="email" id="email" onChange={formChange} value={formInfo["email"] || ''} />
            </div>
          </div>

          {/* ------------------- Right ------------------- */}
          <div>
            <div className="form-field-right">
            <label htmlFor="lastName">Last Name</label>
              <input required type="text" name="lastName" id="lastName" onChange={formChange} value={formInfo["lastName"] || ''}/>
            </div>
          </div>
        </div>
    </>
  );
}
export default PickupForm;
