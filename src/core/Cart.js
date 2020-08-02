import React,{useState,useEffect} from 'react';
import Layout from "./Layout";
import { getProducts } from './apiCore';
import Card from "./Card";
import { getCart } from './cartHelper';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const Cart=()=>{
    const [items,setItems]=useState([])
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
      }, [run]);

    const showItems=items=>{
        return(
            <div>
                <h2 className="text-center headgradient">
                    Your cart has {`${items.length}`} items
                </h2>
                <hr/>
                {items.map((p,i)=>(
                    <Card key={i}
                     product={p}
                     showAddToCartButton={false}
                     cartUpdate={true}
                     setRun={setRun}
                     run={run}
                     />
                ))}
            </div>
        )
    }

    const noItemsMessage=()=>(
        <h2><span className="text-center headgradient">Your Cart is empty. </span><br/>  <br/> <br/><br/><Link to="/shop">Continue Shopping</Link></h2>
    )

    return(
        
        <Layout title="Shopping Cart" description="Manage your cart items. Add remove checkout or continue shopping." className="container-fluid">

                <div className="row">
                    <div className="col-6">
                        {items.length>0 ? showItems(items): noItemsMessage()}
                    </div>
                    <div className="col-6">
                       <h2 className="mb-4 text-center headgradient">Your cart summary</h2>
                        <hr/>
                        
                        <Checkout products={items} setRun={setRun} run={run} />
                          </div>
                </div>
          
              </Layout>    
        )

}

export default Cart;