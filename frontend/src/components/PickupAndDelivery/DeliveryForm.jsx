import { states } from "./countriesAndStates.js";

function DeliveryForm({ setFormInfo, formInfo }) {

  function formChange(e){
      let currentFormInfo = {...formInfo}
      currentFormInfo[e.target.name] =e.target.value
      setFormInfo(currentFormInfo)
  }

  return (
    <>
      {/* FORM SECTION */}
        <div className="form_field_container">
          {/* ------------------- Left ------------------- */}
          <div className="form-left-panel">
            <div className="form-field">
              <label htmlFor="firstName">First Name</label>
              <input required type="text" name="firstName" id="firstName"aria-label="first name"  onChange={formChange} value={formInfo["firstName"] ? formInfo["firstName"] : ""}/>
            </div>
            <div className="form-field">
              <label htmlFor="address1">Address 1</label>
              <input required type="text" name="address1" id="address1" aria-label="address1" onChange={formChange} value={formInfo["address1"] || ""}/>
            </div>
            <div className="form-field">
              <label htmlFor="city">City</label>
              <input required type="text" name="city" id="city" aria-label="city" onChange={formChange} value={formInfo["city"] || ''}/>
            </div>
            <div className="form-field">
              <label htmlFor="phone">Phone</label>
              <input required type="number" name="phone" id="phone" aria-label="phone" onChange={formChange} value={formInfo["phone"] || ''}/>
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input required type="email" name="email" id="email" aria-label="email" onChange={formChange} value={formInfo["email"] || ''} />
            </div>
          </div>

          {/* ------------------- Right ------------------- */}
          <div>
            <div className="form-field-right">
              <label htmlFor="lastName">Last Name</label>
              <input required type="text" name="lastName" id="lastName" aria-label="last name" onChange={formChange} value={formInfo["lastName"] || ''}/>
            </div>
            <div className="form-field-right">
              <label htmlFor="address2" className="address2">
                Address 2
              </label>
              <input type="text" name="address2" id="address2" aria-label="address2" onChange={formChange} value={formInfo["address2"] || ''}/>
            </div>
            <div className="state-zip">
              <div>
                <label htmlFor="state-selector">State</label>
                <select
                  required
                  name="state"
                  id="state-selector"
                  aria-label="state"
                  onChange={formChange}
                  defaultValue=""
                  value={formInfo["state"]}
                >
                  <option disabled value="">
                    N/A
                  </option>
                  {states.map((state) => {
                    return <option key={state}>{state}</option>;
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="zipCode">Zip Code</label>
                <input
                required
                pattern="[0-9]*"
                title="No Symbols or special characters"
                type="Number"
                className="zip"
                name="zipCode"
                id="zipCode"
                aria-label="zip code"onChange={formChange}
                value={formInfo["zipCode"] || ''}/>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
export default DeliveryForm;
