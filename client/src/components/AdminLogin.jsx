import { useContext, useState } from "react"
import AuthForm from "./AuthForm"
import { BlackPineContext } from "../context/BlackPineContext"



const initInputs = { username: "", password: "" }

function AdminLogin() {

    const { login, resetAuthErr, errMsg, showModal, toggleModal } = useContext(BlackPineContext)

    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e) {
        const { name, value } = e.target
        resetAuthErr()
        setInputs(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }))
    }

    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
        setInputs(initInputs)
        toggleModal()
    }

    return (
        <>
            {showModal &&
                <div className="modal">
                    <div className="admin-login-container">

                        <div className="admin-login-form-div">
                            <h1>Admin Login</h1>

                            <AuthForm
                                inputs={inputs}
                                handleChange={handleChange}
                                handleSubmit={handleLogin}
                                errMsg={errMsg}
                            />

                        </div>
                    </div>
                </div>}
        </>
    )
}

export default AdminLogin