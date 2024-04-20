import {useState} from "react";

export const ItemCount = () => {
    const [cantItems, setCantItems] = useState(0)

    const handleAdd = () => {
        setCantItems(cantItems + 1)
    }

    const handleSub = () => {
        if (cantItems > 0) {
            setCantItems(cantItems - 1)
        }
    }

    return (
        <>
            <div>ItemCount</div>
            <button onClick={handleAdd}> + </button>
            <span>{cantItems}</span>
            <button onClick={handleSub}> - </button>
        </>
    );
}
