import Table from "react-bootstrap/Table";
import { useCartContext } from "../../context/CartContext.jsx";
import { useState } from "react";
import { db } from "../../firebase/dbConnection.js";
import { addDoc, collection, doc, writeBatch } from "firebase/firestore";
import styles from "./Cart.module.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const Cart = () => {
    const { cart, totalPrice, removeItem, clearCart, addItem, removeOneItem } = useCartContext();
    const [formData, setFormData] = useState({ name: "", tel: "", email: "" });

    const handleRemoveItem = (id, price, qty) => {
        removeItem(id, price, qty);
    };

    const handleAddItem = (id, price) => {
        addItem(id, price);
    };

    const handleRemoveOneItem = (id, price, qty) => {
        if (qty === 1) return;
        removeOneItem(id, price);
    };

    const handleClearCart = () => {
        clearCart();
    };

    const updateStock = async (cartItems) => {
        const batch = writeBatch(db);
        const productsCollection = collection(db, "products");

        cartItems.forEach(item => {
            if (item.stock !== null) {
                const productRef = doc(productsCollection, item.id);
                batch.update(productRef, {
                    stock: item.stock - item.qty
                });
            }
        });

        return batch.commit();
    };

    const handleSaveCart = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.tel || !formData.email) {
            alert("Por favor complete todos los campos del formulario.");
            return;
        }

        console.log("Saving in Database");
        console.log("formData", formData);
        console.log("cart", cart);

        const ordersCollection = collection(db, "orders");
        const newOrder = {
            buyer: formData,
            items: cart,
            date: new Date(),
            total: totalPrice,
        };

        addDoc(ordersCollection, newOrder)
            .then((doc) => {
                alert("Compra realizada con éxito, su número de orden es: " + doc.id);
                console.log(doc);
                updateStock(cart)
                    .then(() => {
                        clearCart();
                        setFormData({ name: "", tel: "", email: "" });
                    })
                    .catch((err) => console.log("Error updating stock: ", err));
            })
            .catch((err) => console.log(err));
    };

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Table striped bordered hover variant="dark" style={{ marginBottom: 0 }} className={"text-center"}>
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
                                <img src={image} className="w-100" style={{ height: '173.6px' }} alt={name} />
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
                    <td>${totalPrice} USD</td>
                    <td colSpan={4}><button className={styles.btn_pseudoclase} onClick={handleClearCart}>Vaciar carrito</button></td>
                </tr>
                </tbody>
            </Table>
            <span style={{ display: cart.length !== 0 ? 'inline' : 'none'}}>
                <Form className={"py-5 " + styles.form} onSubmit={handleSaveCart}>
                    <div className={"container text-center"}>
                        <Form.Group className="mb-3">
                            <Form.Label className={"lead"}>Nombre</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Ingresar nombre..." value={formData.name} onChange={handleOnChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={"lead"}>Teléfono</Form.Label>
                            <Form.Control type="tel" name="tel" placeholder="Ingresar número telefónico..." value={formData.tel} onChange={handleOnChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={"lead"}>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Ingresar email..." value={formData.email} onChange={handleOnChange} />
                        </Form.Group>
                        <Button className={styles.btn_pseudoclase} type="submit">
                            Comprar
                        </Button>
                    </div>
                </Form>
            </span>
        </>
    );
};
