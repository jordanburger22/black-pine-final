import { useContext, useEffect, useState } from "react";
import { BlackPineContext } from "../context/BlackPineContext";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import ServiceList from "./ServiceList";


function Home({ token }) {

    const { businessInfo, getInfo, services, addNewService, editBusinessInfo } = useContext(BlackPineContext)

    const [businessInputs, setBusinessInputs] = useState({
        businessName: '',
        subHeader: '',
        name: '',
        address: '',
        phoneNumber: '',
        businessFacebookUrl: '',
        instagramUrl: ''
    })

    useEffect(() => {
        getInfo().then(() => setBusinessInputs({
            businessName: businessInfo[0].businessName,
            subHeader: businessInfo[0].subHeader,
            name: businessInfo[0].name,
            address: businessInfo[0].address,
            phoneNumber: businessInfo[0].phoneNumber,
            businessFacebookUrl: businessInfo[0].businessFacebookUrl,
            instagramUrl: businessInfo[0].instagramUrl
        }))
    }, [])

    const [newServiceInputs, setNewServiceInputs] = useState({
        title: '',
        subTitle: '',
        price: '',
        description: '',
        serviceImg: ''

    })

    const [businessToggle, setBusinessToggle] = useState(false)

    const [newServiceToggle, setNewServiceToggle] = useState(false)

    

    const handleChange = (e) => {
        const { name, value } = e.target
        setBusinessInputs(prevInputs => {
            return {
                ...prevInputs,
                [name]: value
            }
        })
    }

    function handleNewServiceChange(e) {
        const { name, value } = e.target
        setNewServiceInputs(prevInputs => {
            return {
                ...prevInputs,
                [name]: value
            }
        })
    }

    function handleNewServiceSubmit(e) {
        e.preventDefault()
        addNewService(newServiceInputs)
        setNewServiceToggle(false)
        setNewServiceInputs({
            title: '',
            subTitle: '',
            price: '',
            description: '',
            serviceImg: ''
        })
    }

    function handleEditBusinessSubmit(e){
        e.preventDefault()
        editBusinessInfo(businessInfo[0]._id, businessInputs)
        setBusinessToggle(false)
    }


    const serviceList = services.map((service, index) => {
        return (
            <ServiceList
                key={service._id}
                service={service}
                index={index}
                token={token}
            />
        )
    })


    return (
        <div>

            {businessInfo.length > 0 &&
                <div className="main-top">
                    <h1>{businessInfo[0].businessName}</h1>
                    <h3>{businessInfo[0].subHeader}</h3>
                </div>}
            {token &&
                <div className="business-admin-btns">
                    <button onClick={() => setBusinessToggle(true)}>Edit Business Info</button>
                </div>}
            {token && businessToggle &&
                <>
                    <form onSubmit={handleEditBusinessSubmit}>
                        <input
                            name="businessName"
                            value={businessInputs.businessName}
                            onChange={handleChange}
                        />
                        <input
                            name="subHeader"
                            value={businessInputs.subHeader}
                            onChange={handleChange}
                        />
                        <input
                            name="name"
                            value={businessInputs.name}
                            onChange={handleChange}
                        />
                        <input
                            name="address"
                            value={businessInputs.address}
                            onChange={handleChange}
                        />
                        <input
                            name="phoneNumber"
                            value={businessInputs.phoneNumber}
                            onChange={handleChange}
                        />
                        <input
                            name="businessFacebookUrl"
                            value={businessInputs.businessFacebookUrl}
                            onChange={handleChange}
                        />
                        <input
                            name="instagramUrl"
                            value={businessInputs.instagramUrl}
                            onChange={handleChange}
                        />
                        <button>Submit</button>
                    </form>
                    <button onClick={() => setBusinessToggle(false)}>Cancel</button>
                </>
            }
            <div>
                {serviceList}
            </div>
            {token && !newServiceToggle && <button onClick={() => setNewServiceToggle(true)}>Add New Service</button>}
            {token && newServiceToggle &&
                <>
                    <form onSubmit={handleNewServiceSubmit}>
                        <input
                            name="title"
                            value={newServiceInputs.title}
                            onChange={handleNewServiceChange}
                            required
                            placeholder="Title"
                        />
                        <input
                            name="subTitle"
                            value={newServiceInputs.subTitle}
                            onChange={handleNewServiceChange}
                            placeholder="Sub-Title"
                        />
                        <input
                            name="price"
                            value={newServiceInputs.price}
                            onChange={handleNewServiceChange}
                            placeholder="Price"
                        />
                        <input
                            name="serviceImg"
                            value={newServiceInputs.serviceImg}
                            onChange={handleNewServiceChange}
                            placeholder="Service Img Url"
                        />
                        <textarea
                            name="description"
                            value={newServiceInputs.description}
                            onChange={handleNewServiceChange}
                            placeholder="Description"
                        />
                        <button>Submit</button>
                    </form>
                    <button onClick={() => setNewServiceToggle(false)}>Cancel</button>
                </>}
        </div>
    );
}

export default Home;