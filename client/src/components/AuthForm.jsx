import { useContext } from "react"
import { BlackPineContext } from "../context/BlackPineContext"

function AuthForm(props) {

    const { inputs: { username, password }, handleChange, handleSubmit, errMsg } = props

    const { toggleModal } = useContext(BlackPineContext)

    return (
        <>
            <form className="auth-form-container" onSubmit={handleSubmit}>
                <input
                    placeholder="Username"
                    value={username}
                    name="username"
                    type="text"
                    onChange={handleChange}

                />

                <input
                    placeholder="Password"
                    value={password}
                    name="password"
                    type="password"
                    onChange={handleChange}

                />

                <button className="nav-button" onClick={handleSubmit}>Log In</button>
                <p>{errMsg}</p>
            </form>

            <button onClick={toggleModal}>Close</button>
        </>
    )
}

export default AuthForm