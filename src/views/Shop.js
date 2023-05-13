import { useContext, useState, useEffect} from "react";
import axios from "axios";
import { DataContext } from "../context/DataProvider";
import { useDatabase, useUser } from "reactfire";
import { ref, set } from "firebase/database";


// const Shop = () => {
//     const db = useDatabase();
//     const { data:user } = useUser();
//     const [products, setProducts] = useState(( )=> loadProductData())
//     const local_url = 'http://127.0.0.1:5000/api/products';
//     console.log(local_url);

//     const getProductData = async () => {
//         let response = await axios.get(local_url);
//         return response.status === 200 ? response.data : null
//     }

//     const loadProductData = async () => {
//         let data = await getProductData();
//         console.log(data, typeof data);
//         setProducts(data.data)

//     }

    const Shop = () => {
        const db = useDatabase();
        const { data:user } = useUser();
        const web_url = 'https://capstone-final-m79u.onrender.com/view-all-products'
        const local_url = 'http://127.0.0.1:5000/api/products';
        console.log(web_url,local_url);
        console.log(local_url);
        async function getProductData() {
            let response = await axios.get(local_url, {headers:{"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}});
            console.log(response)
            return response.status === 200 ? response.data : null
        }
    
        async function loadProductData() {
            let data = await getProductData();
            console.log(data, typeof data);
            setProducts(data.data)
        }
        const [products, setProducts] = useState(( )=> loadProductData());
    
        
    
      
          


    const {cart, setCart} = useContext(DataContext);

    const addProduct = (product) => {
        let copyCart = {...cart}

        copyCart.size ++;
        copyCart.total += product.price;
        copyCart.products[product.id] ?
        copyCart.products[product.id].quantity ++
        :
        copyCart.products[product.id] = {data: product, quantity:1};
        console.log(copyCart);
        if (user){
            set(ref(db, 'carts/' + user.uid), copyCart);
        }
        setCart(copyCart)
    }
    return (
        <div className="container">
            <div className="row">
                <h1> SHOP</h1>
            </div>
            <div className="row">
              {/* this is where we'll throw in a bootstrap for each product */  console.log(products, typeof products)}
              {typeof products === 'object' && !products.then ? products.map((product, index) => {
                    return <div className="card m-4 border border-4 border-dark" key={index} style={{width: 18 + 'rem'}}>
                        <img src={product.image} className="card-img-top mt-3 rounded" alt={product.title} />
                        <div className="card-body">
                            <h3>{product.title}</h3>
                            <h5 className="card-title">{product.title} {product.category}</h5>
                            <p className="card-text">{product.description}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Title- {product.title}</li>
                            <li className="list-group-item">Description- {product.description}</li>
                            <li className="list-group-item">Price-${product.price}</li>
                        </ul>
                        <div className="card-body">
                            <button href="#" className="card-link btn btn-success mb-2" onClick={() => addProduct(product)}>Add to cart!</button>
                            <button href="#" className="card-link btn btn-secondary" disabled>Maybe later?</button>
                        </div>
                    </div>
                }) :
                <h3> Searching the Database... please be patient</h3>
            }

                
            </div>
        </div>

    );
}

export default Shop;