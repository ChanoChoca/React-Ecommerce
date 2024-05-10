import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import styles from './CartWidget.module.css';

export const CartWidget = () => {
    return (
        <span>
            <span><FontAwesomeIcon icon={faCartShopping} className={styles.color_cart}/></span>
            <span className={styles.color_cart}>3</span>
        </span>
    );
};
