import { useContext } from "react";
import logo from "../assets/black-pine-logo.jpg"
import { Link } from "react-router-dom";
import { ButtonGroup, Button } from "reactstrap";
import { BlackPineContext } from "../context/BlackPineContext";


function Header({ token }) {

    const { logout } = useContext(BlackPineContext)

    return (
        <nav className="nav-bar">
            <img className="nav-logo" src={logo} />
            <ButtonGroup className="nav-buttons">
                <Link to="/"><Button className="nav-button">Home</Button></Link>
                <Link to="/contact"><Button className="nav-button" >Contact</Button></Link>
                <a href="https://www.facebook.com/profile.php?id=100083172138963" target="_blank"><Button className="nav-button"><i className="fa-brands fa-facebook-f"></i></Button></a>
                <a href='https://instagram.com/black_pine_wellness?igshid=YmMyMTA2M2Y=' target="_blank"><Button className="nav-button"><i className="fa-brands fa-instagram" ></i></Button></a>
                {token && <Button className="nav-button" onClick={logout}>Logout</Button>}
            </ButtonGroup>
        </nav>
    )
}

export default Header;