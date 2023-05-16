import { ref, set } from "firebase/database";
import { collection, doc, query } from "firebase/firestore";
import { useContext, useState } from "react";
import {  useDatabase,   useFirestore,   useFirestoreCollectionData,   useFirestoreDocData,   useUser, } from "reactfire";
import { DataContext } from "../context/DataProvider";
import {addDoc} from 'firebase/firestore';

const Shop = () => {
  const db = useDatabase();
  const { data: user } = useUser();
  const { cart, setCart } = useContext(DataContext);
 

  const firestore = useFirestore();
  const ref = doc(firestore, 'count', 'counter');
  

  const productsCollection = collection(firestore, "products");
  const productsQuery = query(productsCollection);
  const { status, data: products } = useFirestoreCollectionData(productsQuery);
  const [productsState, setProductsState] = useState([]);

  const addProduct = (product) => {
    let copyCart = { ...cart };

    copyCart.size++;
    copyCart.total += product.price;
    copyCart.products[product.id]
      ? copyCart.products[product.id].quantity++
      : (copyCart.products[product.id] = { data: product, quantity: 1 });
    console.log(copyCart);
    if (user) {
      set(ref(db, "carts/" + user.uid), copyCart);
    }
    setCart(copyCart);
  };
const cartCollection = doc(firestore, 'carts', 'test')
const cartQuery = query(cartCollection)   
const { data: carts } = useFirestoreDocData(cartQuery);
console.log(carts)


// const addProduct = (product) => {
//   console.log(product);
//   console.log(user);
//   // uid: user.uid,
//     addDoc(productsCollection, { uid: user.uid, productid: product.id});
//   };

//   const addProduct = async (id) => {
//     firestore
//       .collection('carts')
//       .doc(user.uid)
//       .set({
//         products: [id],
//       });
//     console.log('added to cart', id);
//   };

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
                style={{ width: 18 + "rem" }}
              >
                <img
                  src={product.img_url}
                  className="card-img-top mt-3 rounded"
                  alt={product.title}
                />
                <div className="card-body">
                  <h3>{product.title}</h3>
                  <h5 className="card-title">
                    {product.title} {product.category}
                  </h5>
                  {/* <p className="card-text">{product.description}</p> */}
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Title- {product.title}</li>
                  {/* <li className="list-group-item">
                    Description- {product.description}
                  </li> */}
                  <li className="list-group-item">Price-${product.price}</li>
                </ul>
                <div className="card-body">
                  <button
                    href="#"
                    className="card-link btn btn-success mb-2"
                    onClick={() => addProduct(product)}
                  >
                    Add to cart!
                  </button>
                  <button
                    href="#"
                    className="card-link btn btn-secondary"
                    disabled
                  >
                    Maybe later?
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