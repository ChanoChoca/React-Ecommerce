import {useCartContext} from "../../context/CartContext.jsx";
import Table from "react-bootstrap/Table";

export const Cart = () => {
    const { cart, totalPrice, removeItem, clearCart } = useCartContext();

    const handleRemoveItem = (id, price, qty) => {
        removeItem(id, price, qty);
    };

    const handleClearCart = () => {
        clearCart();
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cart?.map(({ id, name, price, qty }, index) => {
                    return (
                        <tr key={index}>
                            <td></td>
                            <td>{name}</td>
                            <td>{price}</td>
                            <td>{qty}</td>
                            <td>
                                <button onClick={() => handleRemoveItem(id, price, qty)}>
                                    Remove Item
                                </button>
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td colSpan={4}>Total price</td>
                    <td> $ {totalPrice}</td>
                </tr>
                </tbody>
            </Table>
            <button onClick={handleClearCart}>Clear Cart</button>
            {/* <button onClick={handleClearCart}>
        Finalizar Compra - Ir a Checkout
      </button> */}
        </>
    );
};
