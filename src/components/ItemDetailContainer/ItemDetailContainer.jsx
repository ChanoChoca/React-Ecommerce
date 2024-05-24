import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../spinner/Spinner";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { db } from "../../firebase/dbConnection";
import { doc, getDoc } from "firebase/firestore";

export const ItemDetailContainer = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const refDoc = doc(db, "products", productId);
                const docSnap = await getDoc(refDoc);
                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return <Spinner />;
    }

    return product ? <ItemDetail {...product} /> : <p>Product not found</p>;
};

