/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();
const { Provider } = cartContext;

export const useCartContext = () => useContext(cartContext);

const CartContextProvider = ({ children }) => {
    const [totalQty, setTotalQty] = useState(0);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
            const { qty, price } = storedCart.reduce((acc, item) => {
                acc.qty += item.qty;
                acc.price += item.price * item.qty;
                return acc;
            }, { qty: 0, price: 0 });
            setTotalQty(qty);
            setTotalPrice(roundToTwoDecimals(price));
        }
    }, []);

    const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;

    const updateCartState = (newCart) => {
        setCart(newCart);
        const { qty, price } = newCart.reduce((acc, item) => {
            acc.qty += item.qty;
            acc.price += item.price * item.qty;
            return acc;
        }, { qty: 0, price: 0 });
        setTotalQty(qty);
        setTotalPrice(roundToTwoDecimals(price));
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const addToCart = (item, qty) => {
        const newCart = isInCart(item.id)
            ? cart.map((elem) =>
                elem.id === item.id ? { ...elem, qty: elem.qty + qty } : elem
            )
            : [...cart, { ...item, qty }];
        updateCartState(newCart);
    };

    const addItem = (id, price) => {
        const itemToAdd = cart.find((item) => item.id === id);
        if (itemToAdd.stock === null || itemToAdd.qty < itemToAdd.stock) {
            const updatedCart = cart.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
            );
            updateCartState(updatedCart);
        } else {
            console.log("¡No hay suficiente stock para agregar este producto!");
        }
    };

    const removeOneItem = (id, price) => {
        const updatedCart = cart.map((item) =>
            item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
        );
        updateCartState(updatedCart);
    };

    const isInCart = (id) => cart.some((elem) => elem.id === id);

    const removeItem = (id) => {
        const newCart = cart.filter((elem) => elem.id !== id);
        updateCartState(newCart);
    };

    const clearCart = () => {
        setCart([]);
        setTotalQty(0);
        setTotalPrice(0);
        localStorage.setItem("cart", JSON.stringify([]));
    };

    const contextValue = {
        totalQty,
        totalPrice,
        cart,
        addToCart,
        removeItem,
        clearCart,
        addItem,
        removeOneItem,
    };

    return <Provider value={contextValue}>{children}</Provider>;
};

export default CartContextProvider;
