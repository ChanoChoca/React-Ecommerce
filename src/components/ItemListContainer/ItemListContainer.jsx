import { useEffect, useState } from "react";
import {getProducts, getProductsByCategory} from "../../utils/MockData.js";
import { ItemList } from "../ItemList/ItemList.jsx";
import { Spinner } from "../spinner/Spinner";
import {useParams} from "react-router-dom";
// import { usePaginate } from "../../hooks/usePaginate";

export const ItemListContainer = ({ bgBlue, greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [defaultTitle, setDefaultTitle] = useState("");

    const { categoryId } = useParams();
    console.log(categoryId);
    //const itemsPerPage = 2;

    // const {
    //     currentPage,
    //     totalPages,
    //     nextPage,
    //     prevPage,
    //     paginate,
    //     totalPagesArray,
    //     currentData,
    // } = usePaginate(products, itemsPerPage);

    useEffect(() => {
        setLoading(true);

        if (categoryId) {
            getProductsByCategory(categoryId).then((res) => {
                setProducts(res);
                setLoading(false);
            })
        } else {
            getProducts()
                .then((res) => {
                    setProducts(res);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                <h1 className={"text-center pb-5"}>{greeting ? greeting : defaultTitle}</h1>
            )}
            {loading === true ? (
                <Spinner />
            ) : (
                <div>
                    {/* productsList={currentData} */}
                    <ItemList productsList={products} />
                    {/*<div className="d-flex column-gap-1 justify-content-center my-5">*/}
                    {/*    <button className={styles.button} onClick={prevPage}>*/}
                    {/*        ant página*/}
                    {/*    </button>*/}
                    {/*    {totalPagesArray.map((page) => {*/}
                    {/*        let pageButtonStyle = page === currentPage ? `${styles.button} ${styles.currentPage}` : styles.button;*/}
                    {/*        if (page < 6 || page === totalPages) {*/}
                    {/*            return (*/}
                    {/*                <button className={pageButtonStyle} key={page} onClick={() => paginate(page)}>*/}
                    {/*                    {page}*/}
                    {/*                </button>*/}
                    {/*            );*/}
                    {/*        }*/}
                    {/*        if (page === 6) {*/}
                    {/*            return "...";*/}
                    {/*        }*/}
                    {/*    })}*/}
                    {/*    <button className={styles.button} onClick={nextPage}>*/}
                    {/*        sig página*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            )}
        </main>
    );
};
