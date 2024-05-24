import {useState} from "react";
import {Button, Form, Table} from "react-bootstrap";
import {useCartContext} from "../../context/CartContext";
import {addDoc, collection, doc, writeBatch} from "firebase/firestore";
import {db} from "../../firebase/dbConnection";
import styles from "./Cart.module.css";

export const Cart = () => {
    const { cart, totalPrice, removeItem, clearCart, addItem, removeOneItem } = useCartContext();
    const [formData, setFormData] = useState({ name: "", tel: "", email: "" });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRemoveItem = (id, price, qty) => removeItem(id, price, qty);
    const handleAddItem = (id, price) => addItem(id, price);
    const handleRemoveOneItem = (id, price, qty) => qty === 1 ? null : removeOneItem(id, price);
    const handleClearCart = () => clearCart();

    const updateStock = async (cartItems) => {
        const batch = writeBatch(db);
        const productsCollection = collection(db, "products");

        cartItems.forEach(({ id, stock, qty }) => {
            if (stock !== null) {
                const productRef = doc(productsCollection, id);
                batch.update(productRef, { stock: stock - qty });
            }
        });

        return batch.commit();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, tel, email } = formData;
        if (!name || !tel || !email) {
            alert("Por favor complete todos los campos del formulario.");
            return;
        }

        const ordersCollection = collection(db, "orders");
        const newOrder = { buyer: formData, items: cart, date: new Date(), total: totalPrice };

        try {
            const docRef = await addDoc(ordersCollection, newOrder);
            alert(`Compra realizada con éxito, su número de orden es: ${docRef.id}`);
            await updateStock(cart);
            clearCart();
            setFormData({ name: "", tel: "", email: "" });
        } catch (error) {
            console.error("Error realizando la compra:", error);
        }
    };

    return (
        <div>
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
                {cart.map(({ id, image, name, price, qty }) => (
                    <tr key={id}>
                        <td className="col-2 p-0">
                            <img src={image} className="w-100" style={{ height: '173.6px' }} alt={name} />
                        </td>
                        <td className={"lead"}>{name}</td>
                        <td className="col-1">{price} USD</td>
                        <td className="col-1">{qty}</td>
                        <td className="col-1">{price * qty} USD</td>
                        <td className="d-grid justify-content-center gap-2">
                            <Button className={styles.btn_pseudoclase} onClick={() => handleAddItem(id, price)}>Agregar uno</Button>
                            <Button className={styles.btn_pseudoclase} onClick={() => handleRemoveOneItem(id, price, qty)}>Remover uno</Button>
                            <Button className={styles.btn_pseudoclase} onClick={() => handleRemoveItem(id, price, qty)}>Remover item</Button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td className={"fw-bold"}>Precio total</td>
                    <td>${totalPrice} USD</td>
                    <td colSpan={4}><Button className={styles.btn_pseudoclase} onClick={handleClearCart}>Vaciar carrito</Button></td>
                </tr>
                </tbody>
            </Table>
            {cart.length !== 0 && (
                <Form className={"py-5 " + styles.form} onSubmit={handleSubmit}>
                    <div className={"container text-center"}>
                        <Form.Group className="mb-3">
                            <Form.Label className={"lead"}>Nombre</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Ingresar nombre..." value={formData.name} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={"lead"}>Teléfono</Form.Label>
                            <Form.Control type="tel" name="tel" placeholder="Ingresar número telefónico..." value={formData.tel} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={"lead"}>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Ingresar email..." value={formData.email} onChange={handleInputChange} />
                        </Form.Group>
                        <Button className={styles.btn_pseudoclase} type="submit">Comprar</Button>
                    </div>
                </Form>
            )}
        </div>
    );
};
