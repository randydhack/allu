import PickupForm from "./PickupForm"
import DeliveryForm from "./DeliveryForm"
import {useState}  from "react"
import { createOrder } from "../../store/order"
import { useDispatch } from "react-redux"
// import { useContext } from "react"
import { useSelector } from "react-redux"

import "./PickupAndDelivery.scss"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

function PickupAndDelivery(){
    const {state} = useLocation()
    const navigate = useNavigate()
    const currUser = useSelector((state) => state.session.user);
    const [deliveryOrder, setDelivery] = useState(true)
    const [formInfo, setFormInfo] = useState({})
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    function radioChange(e){
        if((deliveryOrder&&e.target.value==="pickup"&&e.target.checked)||(!deliveryOrder&&e.target.value==="delivery"&&e.target.checked)){
            setDelivery(!deliveryOrder)
        }
    }
    function handleFormSubmit(e){
        e.preventDefault()
            setErrors([])
            let order
            if (deliveryOrder){
                let address = formInfo["address-1"]+" "+formInfo["address-2"]+" "+formInfo["city"]+" "+formInfo["state"]+" "+formInfo["zip"]
                order = {userId:currUser.id, address: address, firstName: formInfo["first-name"], lastName: formInfo["last-name"], phone: formInfo["phone"], email: formInfo["email"], special_request: formInfo['special-instructions'], workforce: false, quote:state.quote, processed: false}
                // console.log(order)
            }
            //send all or some fields to backend (depending on pickup or delivery)
            else{
                order = {userId:currUser.id, firstName: formInfo["first-name"], lastName: formInfo["last-name"], phone: formInfo["phone"], email: formInfo["email"],special_request: formInfo['special-instructions'], workforce: false, quote:state.quote, processed: false}
            }
            let orderCreated = dispatch(createOrder(order))
            if(orderCreated){
                navigate('/order-submitted')
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
            {deliveryOrder?<DeliveryForm setFormInfo={setFormInfo} formInfo={formInfo} errors={errors}/>
            :<PickupForm setFormInfo={setFormInfo} formInfo={formInfo} />}

            <footer>
                <p>Submit your order for {deliveryOrder?"delivery.":"pickup."}</p>
                <input type="submit" value="Submit"/>
            </footer>
        </form>
    </div>
    )
}

export default PickupAndDelivery
