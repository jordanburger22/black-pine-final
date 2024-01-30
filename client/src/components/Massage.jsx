import { useContext, useState } from "react";
import { BlackPineContext } from "../context/BlackPineContext";
import SingleMassage from "./SingleMassage";


function Massage() {

    const { massageStyles, token, sendNewMassage } = useContext(BlackPineContext)

    const [newMassageToggle, setNewMassageToggle] = useState(false)

    const [newMassageInput, setNewMassageInput] = useState({
        title: '',
        description: '',
        price: ''
    })

    const massageList = massageStyles.map(massage => {
        return (
            <SingleMassage
                key={massage._id}
                {...massage}
            />
        )
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewMassageInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendNewMassage(newMassageInput)
        setNewMassageToggle(false)
        setNewMassageInput({
            title: '',
            description: '',
            price: ''
        })
    }


    return (
        <>
            {massageStyles &&
                <div>
                    {massageList}
                </div>}
            {token && <button onClick={() => setNewMassageToggle(true)}>Add New Massage</button>}
            {token && newMassageToggle &&
                <>
                    <form>
                        <input
                            name="title"
                            value={newMassageInput.title}
                            onChange={handleChange}
                            placeholder="Massage Name"
                            required
                        />
                        <input
                            name="description"
                            value={newMassageInput.description}
                            onChange={handleChange}
                            placeholder="Massage Description"
                            required
                        />
                        <input
                            name="price"
                            value={newMassageInput.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                        />
                        <button onClick={handleSubmit}>Add Massage</button>
                    </form>
                    <button onClick={() => setNewMassageToggle(false)}>Cancel</button>
                </>}
        </>
    );
}

export default Massage;