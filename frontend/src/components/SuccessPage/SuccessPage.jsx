import './SuccessPage.scss'
import { NavLink } from 'react-router-dom'
import Logo from '../../images/allu-high-res.png'

function SuccessPage(){

    return(
        <main className="success-page">
            <section className="text-section">
                <h1>Thank you for submitting your order to <img className="text-logo" src={Logo} alt="all-u logo"/>!</h1>
                <h2>Your order is being processed.</h2>
                <h3>An email confirmation for your order will be sent to the email address you provided. Please wait several minutes for the email to arrive in your inbox.</h3>
                <p>For any additional questions or customer service you can contact us at <a href="mailto:info@allu.com" target="_blank">info@allu.com</a>.</p>
                <NavLink to="/order-history" alt="Your order history">Click here to view your order history.</NavLink>
            </section>
        </main>
    )
}
export default SuccessPage