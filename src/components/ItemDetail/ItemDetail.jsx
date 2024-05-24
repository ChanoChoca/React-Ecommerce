import { ItemCount } from "../ItemCount/ItemCount.jsx";
import styles from "./ItemDetail.module.css";
import { useCartContext } from "../../context/CartContext.jsx";

export const ItemDetail = ({ id, name, description, price, category, image, stock }) => {
    const { addToCart } = useCartContext();

    const handleAddToCart = (cantItems) => {
        addToCart({ id, name, description, price, category, image, stock }, cantItems);
    };

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col p-0 ratio ratio-1x1">
                        <img src={image} alt={name} />
                    </div>
                    <div className="col p-0 align-self-center text-center">
                        <h2 className={styles.color_text}>{name}</h2>
                        <p className={styles.color_text}>Precio: {price}</p>
                        {stock > 0 && (
                            <p className={styles.color_text}>Stock: {stock}</p>
                        )}
                        <ItemCount stock={stock} initial={1} handleAddToCart={handleAddToCart} />
                    </div>
                </div>
                <div>
                    <p className={`lead py-5 m-0 text-center ${styles.color_text}`}>{description}</p>
                </div>
            </div>
        </main>
    );
};
