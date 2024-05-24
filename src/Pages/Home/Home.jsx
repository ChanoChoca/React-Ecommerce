//import { WithPermisos } from "../../hoc/WithPermisos.jsx";
import React from "react";
import Slider from "react-slick";
import marks from "../../assets/home/marks.png";
import tanks from "../../assets/home/tanks.jpg";
import resources from "../../assets/home/resources.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Home.module.css";
import {Link} from "react-router-dom";
import {importProductsFromMock} from "../../utils/importProducts.js";
import {deleteProducts} from "../../utils/deleteProducts.js";
import {deleteOrders} from "../../utils/deleteOrders.js";
import {useCartContext} from "../../context/CartContext.jsx";

export const Home = () => {
    const { cart, totalPrice, removeItem, clearCart, addItem, removeOneItem } = useCartContext();

    const handleDeleteProductsAndClearCart = () => {
        deleteProducts()
            .then(() => {
                clearCart();
            })
            .catch((err) => console.log("Error deleting products: ", err));
    };

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    return (
        <main>

            <h2 className={"text-center pt-5 " + styles.text_color}>¡Bienvenido a Chano Upgrade!</h2>

            <section className={"overflow-hidden mt-5"}>
                <Slider {...settings}>
                    <div className={"d-flex flex-column align-items-center"}>
                        <img src={marks} style={{width: '50vw', height: '50vh'}} alt={marks}/>
                        <p className={"lead pt-3 " + styles.text_color}>Brindamos 3 marcas a los tanques que quieras</p>
                    </div>
                    <div className={"d-flex flex-column align-items-center"}>
                        <img src={resources} style={{width: '50vw', height: '50vh'}} alt={resources}/>
                        <p className={"lead pt-3 " + styles.text_color}>Ofrecemos oro, créditos, bonos y experiencia (libre o de tanque)</p>
                    </div>
                    <div className={"d-flex flex-column align-items-center"}>
                        <img src={tanks} style={{width: '50vw', height: '50vh'}} alt={tanks}/>
                        <p className={"lead pt-3 " + styles.text_color}>Investigamos tanques de campaña, o de recompensa, o de línea por tí</p>
                    </div>
                </Slider>
            </section>

            <section className={"container"}>
                <div className={"d-grid gap-3"} style={{justifyItems: 'center'}}>
                    <button style={{width: 'fit-content'}} onClick={importProductsFromMock} className={styles.btn_pseudoclase}>
                        Agregar productos desde mock
                    </button>

                    <button style={{width: 'fit-content'}} onClick={handleDeleteProductsAndClearCart} className={styles.btn_pseudoclase}>
                        Eliminar productos desde mock
                    </button>

                    <button style={{width: 'fit-content'}} onClick={deleteOrders} className={styles.btn_pseudoclase}>
                        Eliminar ordenes
                    </button>
                </div>
            </section>

            <section className={"text-center mt-5 pb-5"}>
                <p className={"lead " + styles.text_color}>¡Te invitamos a explorar nuestro catalogo de productos!</p>
                <Link to="/products" className={styles.btn_pseudoclase}>Ver Productos</Link>
            </section>
        </main>
    // Slider de Imágenes: Usa un slider o carrusel de imágenes que muestre diferentes aspectos del juego, como tanques emblemáticos en acción, escenas de batallas épicas o capturas de pantalla de jugadores exitosos. Esto puede ayudar a sumergir a los usuarios en el mundo del juego desde el primer momento.
    //     Mensaje de Bienvenida: Incluye un mensaje de bienvenida breve y llamativo que explique rápidamente qué ofrece tu aplicación. Algo como "Mejora tu experiencia en World of Tanks con nuestros servicios de investigación, oro y experiencia".
    //     Iconos o Ilustraciones: Utiliza iconos o ilustraciones para representar visualmente los servicios que proporcionas. Por ejemplo, un icono de un tanque para "investigar tanques", una moneda de oro para "ofrecer oro" y una estrella para "mejorar la cuenta en general".
    //     Llamado a la Acción (Call to Action): Incluye un botón de llamado a la acción prominente que invite a los usuarios a explorar más o a registrarse en tu aplicación. Puedes usar textos como "¡Empieza Ahora!" o "Regístrate Gratis".
    //     Testimonios o Reseñas: Si ya tienes clientes satisfechos, considera incluir testimonios o reseñas breves que destaquen los beneficios de utilizar tus servicios. Esto puede ayudar a generar confianza en los nuevos visitantes de tu página.
    //     Sección de Servicios: Dedica un área de tu homepage para destacar los diferentes servicios que ofreces, con breves descripciones y tal vez íconos ilustrativos. Por ejemplo: "Investigación de Tanques", "Mejora de Experiencia", "Compra de Oro", etc.
    //     Enlaces Sociales y de Contacto: Si tienes perfiles en redes sociales o formas de contacto adicionales, asegúrate de incluir enlaces a estas plataformas en tu homepage para que los usuarios puedan seguirte o ponerse en contacto contigo fácilmente.
    );
}

//export default WithPermisos(Home, 1);
