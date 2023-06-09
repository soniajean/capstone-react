import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from "react-bootstrap";
import '../css/Cart.css';
import { useDatabase, useUser } from "reactfire";
import { set, ref } from "firebase/database";

const Cart = () => {
   
    const db = useDatabase();
    const { data:user } = useUser();

    const { cart, setCart } = useContext(DataContext);

    const clearCart = () => {
        if (user){
            set(ref(db, 'carts/' + user.uid), null);
        }
        setCart({size:0, total:0, products: {}});
        
    }

            
        const increaseQuantity = title => {
        
        let copyCart = {...cart};
        copyCart.size++;
        copyCart.total += copyCart.products[title].data.price;
        copyCart.products[title].quantity++;
        //set the state
        if (user){
            set(ref(db, 'carts/' + user.uid), copyCart);
        }
        setCart(copyCart);
    }

    const decreaseQuantity = title => {
        let copyCart = {...cart};
        copyCart.size--;
        copyCart.total -= copyCart.products[title].data.price;
        copyCart.products[title].quantity > 1 ?
        copyCart.products[title].quantity-- :
        delete copyCart.products[title];
        if (user){
            set(ref(db, 'carts/' + user.uid), copyCart);
        }
        setCart(copyCart)
    }
    const removeItem = title => {
        let copyCart = {...cart};
        copyCart.size -= copyCart.products[title].quantity;
        copyCart.total -= copyCart.products[title].quantity*copyCart.products[title].data.price;
        delete copyCart.products[title];
        if (user){
            set(ref(db, 'carts/' + user.uid), copyCart);
        }
        setCart(copyCart)
    }

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Your Cart:</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
            {cart.products&&Object.values(cart.products).map((product, index) => {
                console.log(product);
                return <ListGroup.Item key={index}>
                    <Card.Img variant="top" src={product.data.img_url} title="p-img_url"/>
                    {/* <h3>{product.data.title}</h3> */}
                    <h5>{product.data.description}</h5>
                    <h6>Price: {product.data.price}</h6>
                    <span title="q-span">{product.quantity}</span>
                    <Button variant="secondary" title="dec-btn" onClick={() => {decreaseQuantity(product.data.title)}}><b> - 1 </b></Button>
                   
                    <Button variant="success" title="inc-btn" onClick={() => {increaseQuantity(product.data.title)}}><b> + 1 </b></Button>
                    <br></br>
                    <Button variant="warning" title="r-item" onClick={() => {removeItem(product.data.title)}}>remove this item</Button>
                </ListGroup.Item>
            })}
            </ListGroup>
            <Card.Body>
                <Button variant="primary">Checkout</Button>
                <Button variant="danger" onClick={clearCart}>Clear Cart</Button>
            </Card.Body>
        </Card>
    )
}
export default Cart;

