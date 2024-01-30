import { createContext, useState } from "react";
import axios from 'axios'


export const BlackPineContext = createContext()

const adminAxios = axios.create()

adminAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function BlackPineProvider(props) {

    const [services, setServices] = useState([])
    const [massageStyles, setMassageStyles] = useState([])
    const [businessInfo, setBusinessInfo] = useState([])

    const [showModal, setShowModal] = useState(false); // Modal state

    const toggleModal = () => {
        setShowModal((prevShowModal) => !prevShowModal);
    };

    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)


    function handleAuthErr(errMsg) {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }

    function signup(credentials) {
        axios.post('api/admin/signup', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }


    function login(credentials) {
        axios.post('api/admin/login', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: ""
        })
    }

    function resetAuthErr() {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        })
        )
    }


    // function getInfo() {
    //     axios.get('/api/services')
    //         .then(res => setServices(res.data))
    //         .catch(err => console.log(err))

    //     axios.get("/api/massagestyles")
    //         .then(res => setMassageStyles(res.data))
    //         .catch(err => console.log(err))

    //     axios.get("/api/businessinfo")
    //         .then(res => setBusinessInfo(res.data))
    //         .catch(err => console.log(err))
    // }

    function getInfo() {
        return Promise.all([
            axios.get('/api/services'),
            axios.get('/api/massagestyles'),
            axios.get('/api/businessinfo')
        ])
            .then(responses => {
                const [servicesResponse, massageStylesResponse, businessInfoResponse] = responses;

                setServices(servicesResponse.data);
                setMassageStyles(massageStylesResponse.data);
                setBusinessInfo(businessInfoResponse.data);
            })
            .catch(err => console.log(err));
    }



    function sendNewMassage(newMassageInputs) {
        axios.post('api/massagestyles', newMassageInputs)
            .then(res => setMassageStyles(prevMassages => [
                ...prevMassages,
                res.data
            ]))
            .catch(err => console.log(err))
    }

    function deleteMassage(massageId) {
        axios.delete(`api/massagestyles/${massageId}`)
            .then(res => setMassageStyles(prevMassages => prevMassages.filter(massage => massageId !== massage._id)))
            .catch(err => console.log(err))
    }

    function editMassage(massageId, editFields){
        axios.put(`api/massagestyles/${massageId}`, editFields)
        .then(res => setMassageStyles(prevMassages => prevMassages.map(massage => massage._id !== massageId ? massage : res.data)))
        .catch(err => console.log(err))
    }

    function addNewService(newServiceInputs) {
        axios.post('api/services', newServiceInputs)
            .then(res => setServices(prevServices => [
                ...prevServices,
                res.data
            ]))
            .catch(err => console.log(err))
    }

    function deleteService(serviceId) {
        axios.delete(`api/services/${serviceId}`)
            .then(res => setServices(prevService => prevService.filter(service => serviceId !== service._id)))
            .catch(err => console.log(err))
    }

    function editService(serviceId, edit){
        axios.put(`api/services/${serviceId}`, edit)
        .then(res => setServices(prevServices => prevServices.map(service => service._id !== serviceId ? service : res.data)))
        .catch(err => console.log(err))
    }

    function editBusinessInfo(businessId, edit){
        axios.put(`api/businessinfo/${businessId}`, edit)
        .then(res => setBusinessInfo(prevInfo => prevInfo.map(item => item._id !== businessId ? item : res.data )))
        .catch(err => console.log(err))
    }



    return (
        <BlackPineContext.Provider value={{
            services,
            massageStyles,
            businessInfo,
            addNewService,
            deleteMassage,
            deleteService,
            sendNewMassage,
            getInfo,
            ...userState,
            signup,
            login,
            logout,
            resetAuthErr,
            showModal,
            toggleModal,
            editMassage,
            editService,
            editBusinessInfo

        }}>
            {props.children}
        </BlackPineContext.Provider>
    )
}