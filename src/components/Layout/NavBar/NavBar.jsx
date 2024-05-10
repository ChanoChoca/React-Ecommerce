import styles from './NavBar.module.css'
import logo from '../../../assets/logo.png'
import {CartWidget} from "../../CartWidget/CartWidget.jsx";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export const NavBar = () => {
    return (
        <header>
            <Navbar className={"position-fixed top-0 z-1 w-100 p-0 pe-5"}>
                <Container>
                    <Navbar.Brand href="#home" className="p-0">
                        <img src={logo} alt="" className={styles.navbar__logo} />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className={styles.nav_link}>Inicio</Nav.Link>
                        <Nav.Link href="#tanks" className={styles.nav_link}>Comprar tanques</Nav.Link>
                        <Nav.Link href="#account_level" className={styles.nav_link}>Mejorar WN8</Nav.Link>
                    </Nav>
                </Container>
                <CartWidget/>
            </Navbar>
        </header>
        /*
        <header>
            <Navbar expand="lg" className={"position-fixed top-0 z-1 w-100"}>
                <Container>
                    <Navbar.Brand href="#home"><img src={logo} alt="" className={styles.navbar__logo}/></Navbar.Brand>
                    <Navbar.Toggle className={styles.navbar_toggler_icon}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home" className={styles.nav_link}>Home</Nav.Link>
                            <Nav.Link href="#link" className={styles.nav_link}>Link</Nav.Link>
                            <Nav.Link href="#text" className={styles.cart}><CartWidget/></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
        */
    );
};
