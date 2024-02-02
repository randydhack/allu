import { useState } from "react";

function PickupForm({ setFormInfo, formInfo }) {
//   function formChange(e) {
//     let currentFormInfo = { ...formInfo };
//     currentFormInfo[e.target.name] = e.target.value;
//     setFormInfo(currentFormInfo);
//   }

  return (
    <>
      {/* FORM SECTION */}
        <div className="form_field_container">
          {/* ------------------- Left ------------------- */}
          <div className="form-left-panel">
            <div className="form-field">
              <label htmlFor="first-name">First Name</label>
              <input type="text" />
            </div>
            <div className="form-field">
              <label htmlFor="phone-number">Phone Number</label>
              <input type="number" />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input type="email" />
            </div>
          </div>

          {/* ------------------- Right ------------------- */}
          <div>
            <div className="form-field-right">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" />
            </div>
          </div>
        </div>

        <div className="submit-order-main">
          <p>
            Submitting this will finalize your order and be reviewed before
            shipping.
          </p>
          <button type="submit">Submit Order</button>
        </div>

    </>


    // <>
    //     <label htmlFor="first-name">First Name:
    //     <input required={true} type="text" name="first-name" id="first-name" onChange={formChange} value={formInfo["first-name"]?formInfo["first-name"]:""}/>
    //     </label>
    //     <label htmlFor="last-name">Last Name:
    //     <input required={true} type="text" name="last-name" id="last-name" onChange={formChange} value={formInfo["last-name"]?formInfo["last-name"]:""}/>
    //     </label>
    //     <label htmlFor="Phone">Phone Number:
    //     <input required={true} type="tel" name="phone" id="phone" onChange={formChange} value={formInfo["phone"]?formInfo["phone"]:""}/>
    //     </label>
    //     <label htmlFor="email">E-mail Address:
    //     <input required={true} type="email" name="email" id="email" onChange={formChange} value={formInfo["email"]?formInfo["email"]:""}/>
    //     </label>
    //     <label className="text-area-label" htmlFor="special-instructions">Any Special Instructions:
    //         <textarea name="special-instructions" id="" cols="30" rows="10" onChange={formChange} value={formInfo["special-instructions"]?formInfo["special-instructions"]:""}></textarea>
    //     </label>

    //     {/* <ul className="errors">
    //     {
    //         errors.map((error)=> <li key={error}>{error}</li> )
    //     }
    //     </ul> */}
    // </>
  );
}
export default PickupForm;
