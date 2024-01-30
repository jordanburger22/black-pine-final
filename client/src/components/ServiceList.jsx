import { useContext, useState } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { BlackPineContext } from "../context/BlackPineContext";


function ServiceList(props) {

    const { service, index, token } = props

    const { editService, deleteService } = useContext(BlackPineContext)

    const [editInputs, setEditInputs] = useState({
        title: service.title,
        subTitle: service.subTitle,
        description: service.description,
        price: service.price
    })

    function handleChange(e) {
        const { name, value } = e.target
        setEditInputs(prevInputs => {
            return {
                ...prevInputs,
                [name]: value
            }
        })
    }


    const [editToggle, setEditToggle] = useState(false)

    function handleEditSubmit(e) {
        e.preventDefault()
        editService(service._id, editInputs)
        setEditToggle(false)
        setEditInputs({
            title: service.title,
            subTitle: service.subTitle,
            description: service.description,
            price: service.price
        })
    }

    return (
        <>
            <div key={service._id} className="service-list">
                {index % 2 === 0 && <img src={service.serviceImg} />}
                <div>
                    <h3>{service.title}</h3>
                    <h4>{service.subTitle}</h4>
                    <p>{service.description}</p>
                    {service.price && <p>{service.price}</p>}
                    {service.title === 'Massage' && <Link to="/massage"><Button className="nav-button">See Massage Details</Button></Link>}
                </div>
                {index % 2 === 1 && <img src={service.serviceImg} />}
                {token && <div className="services-admin-btns">
                    <Button onClick={() => setEditToggle(true)}>Edit</Button>
                    <Button onClick={() => deleteService(service._id)}>Delete</Button>
                </div>}
            </div>

            {editToggle && token &&
                <>
                    <form onSubmit={handleEditSubmit}>
                        <input
                            name="title"
                            value={editInputs.title}
                            onChange={handleChange}
                        />
                        <input
                            name="subTitle"
                            value={editInputs.subTitle}
                            onChange={handleChange}
                        />
                        {service.description && <input
                            name="description"
                            value={editInputs.description}
                            onChange={handleChange}
                        />}
                        {service.price && <input
                            name="price"
                            value={editInputs.price}
                            onChange={handleChange}
                        />}

                        <Button>Submit</Button>

                    </form>
                    <Button onClick={() => setEditToggle(false)}>Cancel</Button>
                </>}
        </>
    );
}

export default ServiceList;