import { useState } from "react"

function PickupForm({setFormInfo, formInfo, errors}){

    function formChange(e){
        let currentFormInfo = {...formInfo}
        currentFormInfo[e.target.name]=e.target.value
        setFormInfo(currentFormInfo)
    }

    return(
        <form className="pickup-form">
            <label htmlFor="first-name">First Name:
            <input type="text" name="first-name" id="first-name" onChange={formChange} value={formInfo["first-name"]?formInfo["first-name"]:""}/>
            </label>
            <label htmlFor="last-name">Last Name:
            <input type="text" name="last-name" id="last-name" onChange={formChange} value={formInfo["last-name"]?formInfo["last-name"]:""}/>
            </label>
            <label htmlFor="Phone">Phone Number:
            <input type="text" name="phone" id="phone" onChange={formChange} value={formInfo["phone"]?formInfo["phone"]:""}/>
            </label>
            <label htmlFor="email">E-mail Address:
            <input type="text" name="email" id="email" onChange={formChange} value={formInfo["email"]?formInfo["email"]:""}/>
            </label>
            <ul className="errors">
            {
                errors.map((error)=> <li key={error}>{error}</li> )
            }
            </ul>
        </form>
    )
}
export default PickupForm