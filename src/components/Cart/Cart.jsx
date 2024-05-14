import { useCartContext } from "../../context/CartContext.jsx";
import Table from "react-bootstrap/Table";
import styles from "./Cart.module.css";

export const Cart = () => {
    const { cart, totalPrice, removeItem, clearCart, addItem, removeOneItem } = useCartContext();

    const handleRemoveItem = (id, price, qty) => {
        removeItem(id, price, qty);
    };

    const handleAddItem = (id, price) => {
        addItem(id, price);
    };

    const handleRemoveOneItem = (id, price, qty) => {
        // Check if qty is already 1, if so, return without performing any operation
        if (qty === 1) return;

        removeOneItem(id, price);
    };

    const handleClearCart = () => {
        clearCart();
    };

    return (
        <>
            <Table striped bordered hover variant="dark" style={{marginBottom: 0}} className={"text-center"}>
                <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {cart?.map(({ id, image, name, price, qty }, index) => {
                    return (
                        <tr key={index}>
                            <td className="col-2 p-0">
                                <img src={image} className="w-100" style={{height: '176px'}} alt={name} />
                            </td>
                            <td className={"lead"}>{name}</td>
                            <td className="col-1">{price} USD</td>
                            <td className="col-1">{qty}</td>
                            <td className="col-1">{price * qty} USD</td>
                            <td className="d-grid justify-content-center gap-2">
                                <button className={styles.btn_pseudoclase} onClick={() => handleAddItem(id, price)}>
                                    Agregar uno
                                </button>
                                <button className={styles.btn_pseudoclase} onClick={() => handleRemoveOneItem(id, price, qty)}>
                                    Remover uno
                                </button>
                                <button className={styles.btn_pseudoclase} onClick={() => handleRemoveItem(id, price, qty)}>
                                    Remover item
                                </button>
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td className={"fw-bold"}>Precio total</td>
                    <td> ${totalPrice} USD</td>
                    <td colSpan={4}><button className={styles.btn_pseudoclase} onClick={handleClearCart}>Vaciar carrito</button></td>
                </tr>
                </tbody>
            </Table>
        </>

    );
};
