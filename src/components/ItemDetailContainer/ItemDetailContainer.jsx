import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {getProductById} from "../../utils/MockData.js";
import {Spinner} from "../spinner/Spinner.jsx";
import {ItemDetail} from "../ItemDetail/ItemDetail.jsx";

export const ItemDetailContainer = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getProductById(productId)
            .then((res) => {
                setProduct(res);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, [productId]);

    return loading === true ? (
        <Spinner />
    ) : (
        <>
            <ItemDetail {...product} />
        </>
    );
};
