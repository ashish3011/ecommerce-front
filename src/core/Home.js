import React,{useState,useEffect} from 'react';
import Layout from "./Layout";
import { getProducts } from './apiCore';
import Card from "./Card";
import Search from './Search';
const Home=()=>{
    const [error,setError]=useState(false)
    const [productsBySell,setProductBySell]=useState([])
    const [productsByArrival,setProductByArrival]=useState([])
    
    const loadProductsBySell=()=>{
        getProducts('sold').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProductBySell(data)
            }
        })
    }

    const loadProductsByArrival=()=>{
        getProducts('createdAt').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProductByArrival(data)
            }
        })
    }
    
    useEffect(()=>{
        loadProductsByArrival()
        loadProductsBySell()
    },[])
    
    return(
        
    <Layout title="Home Page" description="Node React E-commerce App" className="container-fluid">
        <Search/>
       <h1 className="mb-4 text-center headgradient">New Arrivals</h1>
       <div className="row">
       {productsByArrival.map((product,i)=>(
            <div key={i} className="col-4 mb-3">
               <Card product={product}/>
            </div>
       ))}
  
       </div>
       <h1 className="mb-4 text-center headgradient">Best Sellers</h1>
          
        <div className="row">
        {productsBySell.map((product,i)=>(
           <div key={i} className="col-4 mb-3">
           <Card product={product}/>
        </div>
        ))}

        </div>

      
          </Layout>    
    )
    }

export default Home;