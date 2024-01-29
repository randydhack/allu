import { useState } from "react"

function PickupForm({setFormInfo, formInfo, errors, handleFormSubmit}){

    function formChange(e){
        let currentFormInfo = {...formInfo}
        currentFormInfo[e.target.name]=e.target.value
        setFormInfo(currentFormInfo)
    }

    return(
        <>
            <label htmlFor="first-name">First Name:
            <input required type="text" name="first-name" id="first-name" onChange={formChange} value={formInfo["first-name"]?formInfo["first-name"]:""}/>
            </label>
            <label htmlFor="last-name">Last Name:
            <input required type="text" name="last-name" id="last-name" onChange={formChange} value={formInfo["last-name"]?formInfo["last-name"]:""}/>
            </label>
            <label htmlFor="Phone">Phone Number:
            <input required type="tel" name="phone" id="phone" onChange={formChange} value={formInfo["phone"]?formInfo["phone"]:""}/>
            </label>
            <label htmlFor="email">E-mail Address:
            <input required type="email" name="email" id="email" onChange={formChange} value={formInfo["email"]?formInfo["email"]:""}/>
            </label>

            {/* <ul className="errors">
            {
                errors.map((error)=> <li key={error}>{error}</li> )
            }
            </ul> */}
        </>
    )
}
export default PickupForm