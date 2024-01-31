import PickupForm from "./PickupForm"
import DeliveryForm from "./DeliveryForm"
import {useState}  from "react"

import "./PickupAndDelivery.scss"


function PickupAndDelivery(){

    const [deliveryOrder, setDelivery] = useState(true)
    const [formInfo, setFormInfo] = useState({})
    const [errors, setErrors] = useState([])
    function radioChange(e){
        if((deliveryOrder&&e.target.value==="pickup"&&e.target.checked)||(!deliveryOrder&&e.target.value==="delivery"&&e.target.checked)){
            setDelivery(!deliveryOrder)
        }
    }
    function handleFormSubmit(){

        //validate fields/ add errors to errors array
        //send all or some fields to backend (depending on pickup or delivery)
        // console.log(formInfo)

        if (!deliveryOrder){
            let pickupFormInfo = {}
            pickupFormInfo["first-name"]=formInfo["phone"]
            pickupFormInfo["last-name"]=formInfo["last-name"]
            pickupFormInfo["phone"]=formInfo["phone"]
            pickupFormInfo["email"]=formInfo["email"]
            console.log(pickupFormInfo)
        }
    }


    return(
    <div className="pickup-delivery-page">
        <header className="pickup-deliery-header">
            <h2>Finalize your order</h2>
        </header>
        <div className="radio-button-container">
            <form >
                <label htmlFor="delivery" className="delivery-radio">
                <input type="radio" id="delivery" name="pickup-or-delivery" value="delivery" defaultChecked onChange={radioChange} />
                Order will be shipped.</label>
                <label htmlFor="pickup" >
                <input type="radio" id="pickup" name="pickup-or-delivery" value="pickup" onChange={radioChange}/>
                Order will be picked up at 9 Interstate Ave, Albany ny</label>
            </form>
        </div>
        <form className={deliveryOrder?"delivery-form":"pickup-form"} onSubmit={handleFormSubmit}>
            {deliveryOrder?<DeliveryForm setFormInfo={setFormInfo} formInfo={formInfo} errors={errors} handleFormSubmit={handleFormSubmit}/>
            :<PickupForm setFormInfo={setFormInfo} formInfo={formInfo} errors={errors} handleFormSubmit={handleFormSubmit}/>}
            <footer>
                <p>Submit your order for pickup.</p>
                <input type="submit" value="Submit"/>
            </footer>    
        </form>
    </div>
    )
}

export default PickupAndDelivery