import { ref, set } from "firebase/database";
import { collection, doc, query } from "firebase/firestore";
import { useContext, useState } from "react";
import {  useDatabase,   useFirestore,   useFirestoreCollectionData,   useFirestoreDocData,   useUser, } from "reactfire";
import { DataContext } from "../context/DataProvider";
import '../css/Shop.css';
import {addDoc} from 'firebase/firestore';

const Shop = () => {
  const db = useDatabase();
  const { data: user } = useUser();
  const { cart, setCart } = useContext(DataContext);
 

  const firestore = useFirestore();
  // const ref = doc(firestore, 'count', 'counter');
  

  const productsCollection = collection(firestore, 'products');
  const productsQuery = query(productsCollection);
  const { status, data: products } = useFirestoreCollectionData(productsQuery);
  const [productsState, setProductsState] = useState([]);

 

  const addProduct = (product) => {
    console.log(product)
    console.log(cart)
    let copyCart = { ...cart };
    console.log(copyCart)
    if (!copyCart.products) {
      copyCart.products = {};
    }
    copyCart.size++;
    copyCart.total += product.price;
    copyCart.products[product.title]
      ? copyCart.products[product.title].quantity++
      : (copyCart.products[product.title] = { data: product, quantity: 1 });
    console.log(copyCart);

    if (user) {
      set(ref(db, 'carts/' + user.uid), copyCart);
    }
    setCart(copyCart);
  };
const cartCollection = doc(firestore, 'carts', 'test')
const cartQuery = query(cartCollection)   
const { data: carts } = useFirestoreDocData(cartQuery);



const addToCart =(product) => {
}

  return (
    <div className="container">
      <div className="row">
        <h1> SHOP</h1>
      </div>
      <div className="row">
        {
          /* this is where we'll throw in a bootstrap for each product */ console.log(
            products,
            typeof products
          )
        }
        {typeof products === "object" && !products.then ? (
          products.map((product, index) => {
            return (
              <div
                className="card m-4 border border-4 border-dark"
                key={index}
                style={{ width:10 + "rem" }}
              >
                <img
                  src={product.img_url}
                  className="card-img-top mt-3 rounded"
                  alt={product.title}
                />
                <div className="card-body">
                  <h6>{product.title}</h6>
                  <h6 className="card-title">
                    {/* { {product.category}product.title} */}
                  </h6>
                  {/* <p className="card-text">{product.description}</p> */}
                </div>
                <ul className="list-group list-group-flush">
                  {/* <li className="list-group-item">{product.title}</li> */}
                  <li className="list-group-item">
                    {/* Description- {product.description} */}
                  </li>
                  <li className="list-group-item">Price ${product.price}</li>
                </ul>
                <div className="card-body">
                  <button
                    href="#"
                    className="card-link btn btn-success mb-2"
                    onClick={() => addProduct(product)}
                  >
                    Add to cart!
                  </button>
                
                </div>
              </div>
            );
          })
        ) : (
          <h3> Searching the Database... please be patient</h3>
        )}
      </div>
    </div>
  );
};

export default Shop;