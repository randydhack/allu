import './SuccessPage.scss'
// import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


function SuccessPage(){
    // const order = useSelector(state=>state.singleOrder)
    return(
        <main className="success-page">
            <h1>Thank you for submitting your order to All U!</h1>
            <h2>Your order is being processed.</h2>
            <h3>An email confirmation for your order will be sent to the email address you provided. Please wait several minutes for the email to arrive in your inbox.</h3>
            <p>For any additional questions or customer service you can contact us at info@allu.com.</p>
            <NavLink to="/order-history" alt="Your order history">Click here to view your order history.</NavLink>
        </main>
    )
}
export default SuccessPage