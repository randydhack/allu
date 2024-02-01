import Logo from "../../images/t_shirt_logo.png";
import './ContactUs.scss'

function ContactUs(){
    return(
        <main className="contact-us">
            <h1>
                Contact All-U
            </h1>
            <img src={Logo} alt="The All-U QR Code logo" />
            <h2>ALL U, Inc. 9 Interstate Ave. Albany, NY 12205</h2>
            <p>Phone: 1(518)438-2558 | Toll Free: 1-800-424-ALLU</p>
            <p>Email: <a href="mailto:info@allu.com" target="_blank">info@allu.com</a></p>
        </main>
    )
}
export default ContactUs