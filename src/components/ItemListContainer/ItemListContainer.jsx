import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/dbConnection";
import { usePaginate } from "../../hooks/usePaginate";
import { Spinner } from "../spinner/Spinner";
import { ItemList } from "../ItemList/ItemList";
import styles from "./ItemListContainer.module.css";

export const ItemListContainer = ({ bgBlue, greeting }) => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [defaultTitle, setDefaultTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const {
        totalPages,
        nextPage,
        prevPage,
        paginate,
        totalPagesArray,
        currentData,
    } = usePaginate(products, itemsPerPage, currentPage, setCurrentPage);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productsCollection = collection(db, "products");
                const productQuery = categoryId
                    ? query(productsCollection, where("type", "array-contains", categoryId))
                    : productsCollection;

                const snapshot = await getDocs(productQuery);
                const prodFromDocs = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProducts(prodFromDocs);
                setCurrentPage(1);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    useEffect(() => {
        if (categoryId) {
            const categoryTitles = {
                tank: "Tanques",
                account_level: "Mejoras de cuenta",
            };
            const matchedTitle = Object.keys(categoryTitles).find((key) =>
                products.some((product) => product.type.includes(key))
            );
            if (matchedTitle) {
                setDefaultTitle(categoryTitles[matchedTitle]);
            }
        }
    }, [products, categoryId]);

    return (
        <main>
            {!loading && (
                <h1 className={`text-center pb-5 ${styles.text_color}`}>
                    {greeting || defaultTitle}
                </h1>
            )}
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    <ItemList productsList={currentData} />
                    <div className="d-flex column-gap-1 justify-content-center mt-5 pb-5">
                        <button className={styles.button} onClick={prevPage} disabled={currentPage === 1}>
                            Ant Página
                        </button>
                        {totalPagesArray.map((page) =>
                            page < 6 || page === totalPages ? (
                                <button
                                    className={`${styles.button} ${page === currentPage ? styles.currentPage : ""}`}
                                    key={page}
                                    onClick={() => paginate(page)}
                                >
                                    {page}
                                </button>
                            ) : (
                                page === 6 && <span key="ellipsis">...</span>
                            )
                        )}
                        <button className={styles.button} onClick={nextPage} disabled={currentPage === totalPages}>
                            Sig Página
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};
