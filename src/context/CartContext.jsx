/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const cartContext = createContext();

export const { Provider } = cartContext;

export const useCartContext = () => {
    return useContext(cartContext);
};

const CartContextProvider = ({ children }) => {
    const [totalQty, setTotalQty] = useState(0);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Optional: load cart from local storage on component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
            setTotalQty(storedCart.reduce((acc, elem) => acc + elem.qty, 0));
            setTotalPrice(
                storedCart.reduce((acc, elem) => acc + elem.price * elem.qty, 0)
            );
        }
    }, []);

    const roundToTwoDecimals = (num) => {
        return Math.round(num * 100) / 100;
    };

    const addToCart = (item, qty) => {
        setTotalQty((prevQty) => prevQty + qty);
        setTotalPrice((prevPrice) =>
            roundToTwoDecimals(prevPrice + item.price * qty)
        );
        let newCart = [];

        if (isInCart(item.id)) {
            newCart = cart.map((elem) => {
                if (elem.id === item.id) {
                    return { ...elem, qty: elem.qty + qty };
                } else {
                    return elem;
                }
            });
            setCart(newCart);
        } else {
            newCart = [...cart, { ...item, qty }];
            setCart(newCart);
        }

        setCartToLocalStorage(newCart);
    };

    const addItem = (id, price) => {
        const itemToAdd = cart.find((item) => item.id === id);

        if (!itemToAdd.stock || itemToAdd.qty < itemToAdd.stock) {
            const updatedCart = cart.map((item) => {
                if (item.id === id) {
                    return { ...item, qty: item.qty + 1 };
                }
                return item;
            });
            setCart(updatedCart);
            setTotalQty((prevQty) => prevQty + 1);
            setTotalPrice((prevPrice) =>
                roundToTwoDecimals(prevPrice + price)
            );
            setCartToLocalStorage(updatedCart);
        } else {
            console.log("¡No hay suficiente stock para agregar este producto!");
        }
    };

    const removeOneItem = (id, price) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.qty > 1) {
                return { ...item, qty: item.qty - 1 };
            }
            return item;
        });
        setCart(updatedCart);
        setTotalQty((prevQty) => prevQty - 1);
        setTotalPrice((prevPrice) =>
            roundToTwoDecimals(prevPrice - price)
        );
        setCartToLocalStorage(updatedCart);
    };

    const isInCart = (id) => {
        return cart.find((elem) => elem.id === id);
    };

    const removeItem = (id, price, qty) => {
        setTotalPrice((prevPrice) =>
            roundToTwoDecimals(prevPrice - price * qty)
        );
        setTotalQty((prevQty) => prevQty - qty);

        // Remove the item from the cart
        const newCart = cart.filter((elem) => elem.id !== id);

        setCart(newCart);
        setCartToLocalStorage(newCart);
    };

    const clearCart = () => {
        setCart([]);
        setTotalQty(0);
        setTotalPrice(0);
        setCartToLocalStorage([]);
    };

    const setCartToLocalStorage = (cartToSave) => {
        localStorage.setItem("cart", JSON.stringify(cartToSave));
    };

    const contextValue = {
        totalQty,
        totalPrice,
        cart,
        addToCart,
        removeItem,
        clearCart,
        addItem,
        removeOneItem
    };

    return <Provider value={contextValue}>{children}</Provider>;
};

export default CartContextProvider;
