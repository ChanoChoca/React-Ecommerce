import {useState} from "react";
import styles from "./ItemCount.module.css";
import {useNavigate} from "react-router-dom";

export const ItemCount = ({stock, initial, handleAddToCart}) => {
    const navigate = useNavigate();
    const [cantItems, setCantItems] = useState(0);
    const [addedProduct, setAddedProduct] = useState(false);

    const handleAdd = () => {
        setCantItems(cantItems + 1)
    };

    const handleSub = () => {
        if (cantItems > 0) {
            setCantItems(cantItems - 1)
        }
    };

    const handleFinishBuy = () => {
        setAddedProduct(false);
        navigate("/cart");
    };

    const handleAgregarAlCarrito = () => {
        setAddedProduct(true);
        handleAddToCart(cantItems);
    };

    return (
        <>
            <div>
                <div>
                    <button onClick={handleSub} className={"me-1 " + styles.btn_pseudoclase}> - </button>
                    <span className={styles.text}>{cantItems}</span>
                    <button onClick={handleAdd} className={"ms-1 " + styles.btn_pseudoclase} > + </button>
                </div>
            </div>

            {addedProduct ? (
                <button onClick={handleFinishBuy} className={"mt-3 " + styles.btn_pseudoclase}>Terminar Compra</button>
            ) : (
                <button onClick={handleAgregarAlCarrito} className={"mt-3 " + styles.btn_pseudoclase}>Agregar al carrito</button>
            )}
        </>
    );
}
