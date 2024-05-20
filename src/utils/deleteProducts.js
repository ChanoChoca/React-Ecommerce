import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/dbConnection";

export const deleteProducts = () => {
    const productsCollection = collection(db, "products");

    return getDocs(productsCollection)
        .then((querySnapshot) => {
            const deletePromises = querySnapshot.docs.map((document) => {
                const docRef = doc(db, "products", document.id);
                return deleteDoc(docRef);
            });

            // Execute all deletion promises sequentially (not ideal for large datasets)
            return Promise.all(deletePromises).then(() => {
                console.log("Todos los productos han sido eliminados.");
            });
        })
        .catch((error) => {
            console.error("Error eliminando los productos: ", error);
        });
};
