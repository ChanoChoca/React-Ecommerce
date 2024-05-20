import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/dbConnection";

export const deleteOrders = () => {
    const ordersCollection = collection(db, "orders");

    getDocs(ordersCollection)
        .then((querySnapshot) => {
            const deletePromises = querySnapshot.docs.map((document) => {
                const docRef = doc(db, "orders", document.id);
                return deleteDoc(docRef);
            });

            // Execute deletion promises sequentially (not ideal for large datasets)
            return Promise.all(deletePromises);
        })
        .then(() => {
            console.log("Todos los pedidos han sido eliminados.");
        })
        .catch((error) => {
            console.error("Error eliminando los pedidos: ", error);
        });
};
