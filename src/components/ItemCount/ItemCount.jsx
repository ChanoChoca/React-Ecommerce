import {useState} from "react";
import styles from "./ItemCount.module.css";

export const ItemCount = ({stock}) => {
    const [cantItems, setCantItems] = useState(0)

    const handleAdd = () => {
        setCantItems(cantItems + 1)
    }

    const handleSub = () => {
        if (cantItems > 0) {
            setCantItems(cantItems - 1)
        }
    }

    const handleAddToCart = () => {
        console.log(`Se agregaron ${cantItems} al carrito`);
    };

    return (
        <>
            <div>
                <button onClick={handleSub} className={"me-1 " + styles.btn_pseudoclase}> - </button>
                <span>{cantItems}</span>
                <button onClick={handleAdd} className={"ms-1 " + styles.btn_pseudoclase} > + </button>
            </div>
            <button onClick={handleAddToCart} className={"mt-3 " + styles.btn_pseudoclase}>Agregar al carrito</button>
        </>
    );
}
