import { ItemCount } from "../ItemCount/ItemCount.jsx";
import styles from "./ItemDetail.module.css";
import Card from "react-bootstrap/Card";

export const ItemDetail = ({id, name, description, price, stock, category, image}) => {
    return (
        <main className={"container"}>
            <div className={"row"}>
                <div className={"col p-0 ratio ratio-1x1"}>
                    <img src={image}  alt={name}/>
                </div>
                <div className={"col p-0 align-self-center text-center"}>
                    <h2>{name}</h2>
                    <p>Precio: {price}</p>
                    <div style={{display: stock !== undefined ? 'inline' : 'none'}}>
                        <p>Stock: {stock}</p>
                    </div>
                    <ItemCount stock={stock} initial={1}/>
                </div>
            </div>
            <div>
                <p className={"lead pt-5 text-center"}>{description}</p>
            </div>
        </main>
    // <Card className={"container " + styles.card}>
    //     <Card.Img variant="top" src={image} />
    //     <Card.Body>
    //         <Card.Title>{name}</Card.Title>
    //         <Card.Text>{description}</Card.Text>
    //         <Card.Text>Price: {price}</Card.Text>
    //         <div style={{display: stock !== undefined ? 'inline' : 'none'}}>
    //             <Card.Text>Stock: {stock}</Card.Text>
    //         </div>
    //         <ItemCount stock={stock} initial={1}/>
    //     </Card.Body>
    // </Card>

    );
}
