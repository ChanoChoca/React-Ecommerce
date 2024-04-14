import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export const CartWidget = () => {
    const [cantItems, setCantItems] = useState(0)

    const handlleAdd = () => {
        setCantItems(cantItems + 1)
    }
    const handlleSubs = () => {
        if (cantItems > 0) {
            setCantItems(cantItems - 1)
        }
        // if (cantItems > 0) setCantItems(cantItems - 1)
        // cantItems > 0 ? setCantItems(cantItems - 1) : alert('No se puede restar')
        // cantItems > 0 && setCantItems(cantItems - 1)
    }

    return (
        <>
            <button onClick={ handlleAdd }> + </button>
            <button onClick={ handlleSubs }> - </button>
            <span>{cantItems}</span>
            <FontAwesomeIcon icon={faCartShopping}/>
        </>
    );
};
