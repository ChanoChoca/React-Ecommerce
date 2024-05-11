import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import styles from './CartWidget.module.css';
import {useCartContext} from "../../context/CartContext.jsx";

export const CartWidget = () => {
    const {totalQty} = useCartContext();

    return (
        <span>
            <span><FontAwesomeIcon icon={faCartShopping} className={styles.color_cart}/></span>
            <span className={styles.color_cart}>{totalQty}</span>
        </span>
    );
};
