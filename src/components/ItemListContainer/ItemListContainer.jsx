/* import styles from './ItemListContainer.module.css' */

import {useEffect, useState} from "react";
import {getProducts} from "../../utils/MockData.js";
import {ItemList} from "../ItemList/ItemList.jsx";

export const ItemListContainer = ({ bgBlue, greeting } ) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then((res) => {
                setProducts(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const defaultTitle = "Default title"

    return (
        <main>
            <h1 className={"text-center"}>{greeting ? greeting : defaultTitle}</h1>
            <div>
                <ItemList productsList={products}/>
            </div>
        </main>
    );
}
