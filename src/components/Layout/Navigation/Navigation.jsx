import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Navigation.module.css";
import logo from "../../../assets/logo.png";
import { CartWidget } from "../../CartWidget/CartWidget";
import { Link } from "react-router-dom";

export const Navigation = () => {
    const [showNav, setShowNav] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            /* scroll hacia arriba o posición actual de scroll <= 85px  */
            const visible = prevScrollPos > currentScrollPos || currentScrollPos <= 85;

            setShowNav(visible); // Actualizar el estado de visibilidad
            setPrevScrollPos(currentScrollPos); // Actualizar la posición anterior de scroll
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    return (
        <header style={{marginBottom: 85}}>
            <Navbar style={{
                transform: showNav ? "translateY(0)" : "translateY(-100%)",
                transition: "transform 0.5s ease-in-out"
            }} className={"position-fixed top-0 z-1 w-100 p-0 pe-5"}>
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} alt="" className={styles.navbar__logo}/>
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
                <CartWidget/>
            </Navbar>
        </header>
    );
}

