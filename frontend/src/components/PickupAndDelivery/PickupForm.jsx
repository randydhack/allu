function PickupForm({ formInfo, formChange }) {


  return (
    <>
      {/* FORM SECTION */}
        <div className="form_field_container">
          {/* ------------------- Left ------------------- */}
          <div className="form-left-panel">
            <div className="form-field">
            <label htmlFor="firstName">First Name</label>
              <input required type="text" name="firstName" id="firstName" aria-label="first name" onChange={formChange} value={formInfo["firstName"] || ""}/>
            </div>
            <div className="form-field">
              <label htmlFor="phone-number">Phone
              <br/>
                <small>Format: 123-456-7890</small>
              </label>
              <input type="tel" id="phone" name="phone" title="10 digit phone number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required onChange={formChange} value={formInfo["phone"] || ''}/>
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
          </div>
        </div>
    </>
  );
}
export default PickupForm;
