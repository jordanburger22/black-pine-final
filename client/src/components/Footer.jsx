import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { BlackPineContext } from '../context/BlackPineContext'

function Footer() {

    const { toggleModal } = useContext(BlackPineContext)

    return (
        <div className="footer-container">
            <p>Black Pine Wellness | Created by Jordan Burger</p>
            <button className="nav-button" onClick={toggleModal}>Admin</button>
        </div>
    )
}

export default Footer