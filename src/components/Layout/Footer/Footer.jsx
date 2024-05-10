import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <footer className={"py-5 " + styles.bgColor}>
            <h2>Footer</h2>
            <a href="http://juancaprioli.infinityfreeapp.com/" className={"lead " + styles.link}>¡Visita mi portafolio!</a>
        </footer>
    );
}
