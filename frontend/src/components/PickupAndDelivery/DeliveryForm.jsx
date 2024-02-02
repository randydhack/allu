import { states } from "./countriesAndStates.js";

function DeliveryForm({ setFormInfo, formInfo, errors }) {

    console.log(formInfo)
  function formChange(e){
      let currentFormInfo = {...formInfo}
      console.log(e.target.value)
      currentFormInfo[e.target.name]=e.target.value
      setFormInfo(currentFormInfo)
  }

  return (
    <>
      {/* FORM SECTION */}
        <div className="form_field_container">
          {/* ------------------- Left ------------------- */}
          <div className="form-left-panel">
            <div className="form-field">
              <label htmlFor="first-name">First Name</label>
              <input type="text" name="first-name" id="first-name" onChange={formChange} value={formInfo["firstName"] ? formInfo["firstName"] : ""}/>
            </div>
            <div className="form-field">
              <label htmlFor="address-1">Address 1</label>
              <input type="text" name="address-1" id="address-1" onChange={formChange} value={formInfo["address1"] || ""}/>
            </div>
            <div className="form-field">
              <label htmlFor="city">City</label>
              <input type="text" name="city" id="city" onChange={formChange} value={formInfo["city"] || ''}/>
            </div>
            <div className="form-field">
              <label htmlFor="phone">Phone Number</label>
              <input type="number" name="phone" id="phone" onChange={formChange} value={formInfo["phone"] || ''}/>
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={formChange} value={formInfo["email"] || ''} />
            </div>
          </div>

          {/* ------------------- Right ------------------- */}
          <div>
            <div className="form-field-right">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" name="last-name" id="last-name" onChange={formChange} value={formInfo["lastName"] || ''}/>
            </div>
            <div className="form-field-right">
              <label htmlFor="address-2" className="address2">
                Address 2
              </label>
              <input type="text" name="address-2" id="address-2" onChange={formChange} value={formInfo["address2"] || ''}/>
            </div>
            <div className="state-zip">
              <div>
                <label htmlFor="state-selector">State</label>
                <select
                  required
                  name="state"
                  id="state-selector"
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
                <label htmlFor="zip-code">Zip Code</label>
                <input type="number" name="zip-code" id="zip-code" onChange={formChange} value={formInfo["zipCode"] || ''}/>
              </div>
            </div>
          </div>
        </div>
    </>

    // <>
    //     <label htmlFor="first-name">First Name:
    //         <input required={true} type="text" name="first-name" id="first-name" onChange={formChange} value={formInfo["first-name"]?formInfo["first-name"]:""}/>
    //     </label>
    //     <label htmlFor="last-name">Last Name:
    //         <input required={true} type="text" name="last-name" id="last-name" onChange={formChange} value={formInfo["last-name"]?formInfo["last-name"]:""}/>
    //     </label>
    //     {/* <label htmlFor="country-selector">Country:
    //         <select required={true} name="country" id="country-selector" onChange={formChange} value={formInfo["country"] || "Choose Your Country"}>
    //             <option disabled>Choose Your Country</option>
    //             {
    //                 countries.map((country)=> (<option key={country}>{country}</option>))
    //             }
    //         </select>
    //     </label> */}
    //     <label htmlFor="address-1">Address 1:
    //         <input required={true} type="text" name="address-1" id="address-1"onChange={formChange} value={formInfo["address-1"]?formInfo["address-1"]:""}/>
    //     </label>
    //     <label htmlFor="address-2">Address 2:
    //         <input type="text" name="address-2" id="address-2"onChange={formChange} value={formInfo["address-2"]?formInfo["address-2"]:""}/>
    //     </label>
    //     <label htmlFor="city">City:
    //         <input required={true} type="text" name="city" id="city"onChange={formChange} value={formInfo["city"]?formInfo["city"]:""}/>
    //     </label>
    //     <label htmlFor="state-selector">State:
    //         <select required name="state"id="state-selector" onChange={formChange} defaultValue="" value={formInfo["state"]}>
    //             <option disabled value=""  >Choose Your State</option>
    //             {
    //                 states.map((state)=> {
    //                     return (<option key={state}>{state}</option>)
    //                 })
    //             }
    //         </select>
    //     </label>
    //     <label htmlFor="zip">Zip Code:
    //         <input required={true} type="text" name="zip" id="zip"onChange={formChange} value={formInfo["zip"]?formInfo["zip"]:""}/>
    //     </label>
    //     <label htmlFor="phone">Phone Number:
    //         <input required={true} type="tel" name="phone" id="phone" onChange={formChange} value={formInfo["phone"]?formInfo["phone"]:""}/>
    //     </label>
    //     <label htmlFor="email">E-mail Address:
    //         <input required={true} type="email" name="email" id="email" onChange={formChange} value={formInfo["email"]?formInfo["email"]:""}/>
    //     </label>
    //     <label className="text-area-label" htmlFor="special-instructions">Any Special Instructions:
    //         <textarea name="special-instructions" id="" cols="30" rows="10" onChange={formChange} value={formInfo["special-instructions"]?formInfo["special-instructions"]:""}></textarea>
    //     </label>
    // </>
  );
}
export default DeliveryForm;
