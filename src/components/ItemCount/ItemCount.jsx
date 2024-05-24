import { useState } from "react";
import styles from "./ItemCount.module.css";
import { useNavigate } from "react-router-dom";

export const ItemCount = ({ stock, initial, handleAddToCart }) => {
    const navigate = useNavigate();
    const [state, setState] = useState({ cantItems: 0, addedProduct: false });

    const handleAdd = () => {
        setState(prevState => ({ ...prevState, cantItems: prevState.cantItems + 1 }));
    };

    const handleSub = () => {
        setState(prevState => ({ ...prevState, cantItems: Math.max(prevState.cantItems - 1, 0) }));
    };

    const handleFinishBuy = () => {
        setState(prevState => ({ ...prevState, addedProduct: false }));
        navigate("/cart");
    };

    const handleAgregarAlCarrito = () => {
        setState(prevState => ({ ...prevState, addedProduct: true }));
        handleAddToCart(state.cantItems);
    };

    return (
        <>
            <div>
                <div>
                    <button onClick={handleSub} className={`me-1 ${styles.btn_pseudoclase}`}> - </button>
                    <span className={styles.text}>{state.cantItems}</span>
                    <button onClick={handleAdd} className={`ms-1 ${styles.btn_pseudoclase}`}> + </button>
                </div>
            </div>

            <button
                onClick={state.addedProduct ? handleFinishBuy : handleAgregarAlCarrito}
                className={`mt-3 ${styles.btn_pseudoclase}`}
            >
                {state.addedProduct ? "Terminar Compra" : "Agregar al carrito"}
            </button>
        </>
    );
};
