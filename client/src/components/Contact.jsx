import { useContext, useState } from "react"
import logo from "../assets/black-pine-logo.jpg"
import { BlackPineContext } from "../context/BlackPineContext"
import { Button } from "reactstrap"


function Contact() {

    const { businessInfo } = useContext(BlackPineContext)

    const contact = businessInfo.map(info => (
        <div className="contact-info">
            <h3>{info.businessName}</h3>
            <h3>{info.address}</h3>
            <h3>{info.phoneNumber}</h3>
            <h3>{info.name}</h3>
        </div>
    ))

    const [inputData, setInputData] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        comments: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const [messageSent, setMessageSent] = useState(false)

    function emailInputData(event) {
        event.preventDefault()

        const formData = {
            name: inputData.name,
            email: inputData.email,
            phoneNumber: inputData.phoneNumber,
            address: inputData.address,
            city: inputData.city,
            state: inputData.state,
            comments: inputData.comments,
            zipCode: inputData.zipCode
        }

        const serviceId = "service_y6lvnjl"
        const templateId = "template_s0cvfbm"

        emailjs.send(serviceId, templateId, formData)
            .then((res) => {
                setInputData({
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    message: "",
                })
                setMessageSent(true)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="contact-container">
            <div className="contact-row1">
                <img alt="" src={logo} className='contact-logo' />
            </div>
            <h3 className="contact-p">Text or Call for Inquiry</h3>
            <div className="contact-row2">
                {contact}
            </div>
            <div className="contact-row3">
                <a href='https://instagram.com/black_pine_wellness?igshid=YmMyMTA2M2Y=' target="_blank"><Button className="contact-button"><i className="fa-brands fa-instagram" ></i></Button></a>
                <a href="https://www.facebook.com/profile.php?id=100083172138963" target="_blank" ><Button className="contact-button"><i className="fa-brands fa-facebook-f"></i></Button></a>
            </div>
        </div>
    )
}

export default Contact