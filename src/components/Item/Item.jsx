import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Item.module.css'
import {Link} from "react-router-dom";

export const Item = ({id, name, price, image}) => {
    const handleOnClick = () => {
        console.log("click");
    }

    return (
        <Card style={{ width: '18rem' }} className={styles.card}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    ${price}
                </Card.Text>
                <Link to={`/products/${id}`} onClick={handleOnClick} className={styles.btn_pseudoclase} style={{cursor: "pointer"}}>
                    Ver detalles
                </Link>
            </Card.Body>
        </Card>
    );
}
