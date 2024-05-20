import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "../../utils/MockData.js";
import { ItemList } from "../ItemList/ItemList.jsx";
import { Spinner } from "../spinner/Spinner";
import { useParams } from "react-router-dom";
import { usePaginate } from "../../hooks/usePaginate";
import { db } from "../../firebase/dbConnection.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import styles from "./ItemListContainer.module.css";

export const ItemListContainer = ({ bgBlue, greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [defaultTitle, setDefaultTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // Estado de la página actual

    const { categoryId } = useParams();
    const itemsPerPage = 3;

    const {
        totalPages,
        nextPage,
        prevPage,
        paginate,
        totalPagesArray,
        currentData,
    } = usePaginate(products, itemsPerPage, currentPage, setCurrentPage); // Pasar estado y funciones de manejo de paginación como argumentos

    useEffect(() => {
        setLoading(true);

        const productsCollection = collection(db, "products");

        if (categoryId) {
            const cons = query(
                productsCollection,
                where("type", "array-contains", categoryId)
            );

            getDocs(cons)
                .then(({ docs }) => {
                    const prodFromDocs = docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    console.log(prodFromDocs);

                    setProducts(prodFromDocs);
                    setLoading(false);
                    setCurrentPage(1); // Reiniciar la página actual al cambiar de categoría
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            getDocs(productsCollection)
                .then(({ docs }) => {
                    const prodFromDocs = docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    setProducts(prodFromDocs);
                    setLoading(false);
                    setCurrentPage(1); // Reiniciar la página actual al obtener todos los productos
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        /*if (categoryId) {
            getProductsByCategory(categoryId).then((res) => {
                setProducts(res);
                setLoading(false);
                setCurrentPage(1); // Reiniciar la página actual al cambiar de categoría
            });
        } else {
            getProducts()
                .then((res) => {
                    setProducts(res);
                    setLoading(false);
                    setCurrentPage(1); // Reiniciar la página actual al obtener todos los productos
                })
                .catch((error) => {
                    console.log(error);
                });
        }*/
    }, [categoryId]);

    useEffect(() => {
        if (categoryId) {
            products.find(product => {
                if (product.type.includes("tank")) {
                    setDefaultTitle("Tanques");
                } else if (product.type.includes("account_level"))  {
                    setDefaultTitle("Mejoras de cuenta");
                }
            });
        }
    }, [products, categoryId]);

    return (
        <main>
            {!loading && (
                <h1 className={"text-center pb-5 " + styles.text_color}>{greeting ? greeting : defaultTitle}</h1>
            )}
            {loading === true ? (
                <Spinner />
            ) : (
                <div>
                    <ItemList productsList={currentData} />
                    <div className="d-flex column-gap-1 justify-content-center my-5">
                        <button className={styles.button} onClick={prevPage}>
                            ant página
                        </button>
                        {totalPagesArray.map((page) => {
                            let pageButtonStyle = page === currentPage ? `${styles.button} ${styles.currentPage}` : styles.button;
                            if (page < 6 || page === totalPages) {
                                return (
                                    <button className={pageButtonStyle} key={page} onClick={() => paginate(page)}>
                                        {page}
                                    </button>
                                );
                            }
                            if (page === 6) {
                                return "...";
                            }
                        })}
                        <button className={styles.button} onClick={nextPage}>
                            sig página
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

