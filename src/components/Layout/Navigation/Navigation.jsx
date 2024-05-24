import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../../../assets/logo.png";
import { CartWidget } from "../../CartWidget/CartWidget";
import styles from "./Navigation.module.css";

export const Navigation = () => {
    const [showNav, setShowNav] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const visible = prevScrollPos > currentScrollPos || currentScrollPos <= 85;

            setShowNav(visible);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    return (
        <header style={{ marginBottom: 85 }}>
            <Navbar
                style={{
                    transform: showNav ? "translateY(0)" : "translateY(-100%)",
                    transition: "transform 0.5s ease-in-out",
                }}
                className="position-fixed top-0 z-1 w-100 p-0 pe-5"
            >
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} alt="Logo" className={styles.navbar__logo} />
                    </Navbar.Brand>
                    <Nav className="gap-3">
                        <Link to="/" className={styles.nav_link}>Inicio</Link>
                        <Link to="/products" className={styles.nav_link}>Productos</Link>
                        <Link to="/category/tank" className={styles.nav_link}>Comprar tanques</Link>
                        <Link to="/category/account_level" className={styles.nav_link}>Mejorar cuenta</Link>
                        <Link to="/cart" className={styles.nav_link}>Carrito</Link>
                        <Link to="/about" className={styles.nav_link}>Sobre nosotros</Link>
                        <Link to="/dashboard" className={styles.nav_link}>Dash</Link>
                    </Nav>
                </Container>
                <CartWidget />
            </Navbar>
        </header>
    );
};
