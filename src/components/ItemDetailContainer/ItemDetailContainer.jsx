import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {getProductById} from "../../utils/MockData.js";
import {Spinner} from "../spinner/Spinner.jsx";
import {ItemDetail} from "../ItemDetail/ItemDetail.jsx";
import { db } from "../../firebase/dbConnection.js";
import { collection, getDoc, doc } from "firebase/firestore";

export const ItemDetailContainer = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const productsCollection = collection(db, "products");
        const refDoc = doc(productsCollection, productId);

        getDoc(refDoc)
            .then((doc) => {
                setProduct({id: doc.id, ...doc.data()});
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                console.log(err);
        });
        // getProductById(productId)
        //     .then((res) => {
        //         setProduct(res);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         setLoading(false);
        //         console.log(err);
        //     });
    }, [productId]);

    return loading === true ? (
        <Spinner />
    ) : (
        <>
            <ItemDetail {...product} />
        </>
    );
};
