import { useContext, useState } from "react";
import { BlackPineContext } from "../context/BlackPineContext";

function SingleMassage(props) {

    const { title, price, description, _id } = props

    const { token, deleteMassage, editMassage } = useContext(BlackPineContext)

    const [editToggle, setEditToggle] = useState(false)

    const [editInputs, setEditInputs] = useState({
        title: title,
        description: description,
        price: price
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

    function handleEdit(e) {
        e.preventDefault()
        editMassage(_id, editInputs)
        setEditToggle(false)
    }

    return (
        <div>
            <div className="massage-style">
                <h3>{title}</h3>
                <h5>{description}</h5>
                <h4>{price}</h4>

                <div className="massage-admin-btns">
                    {!editToggle && token && <button className="nav-button" onClick={() => setEditToggle(true)}>Edit</button>}
                    {!editToggle && token && <button className="nav-button" onClick={() => deleteMassage(_id)}>Delete</button>}
                </div>

                {editToggle &&
                    <>
                        <form onSubmit={handleEdit} className="massage-edit-toggle">
                            <input
                                value={editInputs.title}
                                name="title"
                                onChange={handleChange}
                            />

                            <textarea
                                value={editInputs.description}
                                name="description"
                                onChange={handleChange}
                            />

                            <input
                                value={editInputs.price}
                                name="price"
                                onChange={handleChange}
                            />

                            <button className="nav-button">Save</button>
                        </form>
                        
                        <button className="nav-button" onClick={() => setEditToggle(false)}>Cancel</button>
                    </>
                }
            </div>
        </div>
    );
}

export default SingleMassage
