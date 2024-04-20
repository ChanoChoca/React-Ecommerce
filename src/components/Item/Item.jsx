import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Item = ({id, name, description, price, image}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    ${price}
                </Card.Text>
                <Button variant="primary">Ver detalles</Button>
            </Card.Body>
        </Card>
    );
}
