import React,{useState,useEffect} from 'react';
import Layout from "../core/Layout";
import { isAuthenticated} from '../auth';
import { Link } from 'react-router-dom';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';


const Orders=()=>{
    const [orders,setOrders]=useState([])
    const [statusValue,setStatusValues]=useState([])
    const {user,token}=isAuthenticated()

    const loadOrders=()=>{
        listOrders(user._id,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setOrders(data)
            }
        })
    }

    const loadStatusValues=()=>{
        getStatusValues(user._id,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setStatusValues(data)
            }
        })
    }


    const showOrdersLength=()=>{
        if(orders.length>0){
            return(
            <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
            )
        }else{
            return <h1 className="text-danger">No orders</h1>
        }
    }

    useEffect(()=>{
        loadOrders()
        loadStatusValues()
    },[])

    const showInput=(key,value)=>(
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                 <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly />
        </div>
    )

        const handleStatusChange=(e,orderId)=>{
            updateOrderStatus(user._id,token,orderId,e.target.value).then(data=>{
                if(data.error){
                    console.log('status update failed')
                }else{
                    loadOrders()
                }
            })
        }

    const showStatus=(o)=>(
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select className="form-control" onChange={(e)=>handleStatusChange(e,o._id)}>
                <option>Update Status</option>
    {statusValue.map((s,i)=>(<option key={i}>{s}</option>))}
            </select>
        </div>
    )

    return(
        <Layout title="Orders" description={`G'day ${user.name}, you can manage all the orders here`} className="container-fluid" >
             
        <div className="row">
      
        <div className="col-md-8 offset-md-2">
      
             {showOrdersLength()}
                {orders.map((o,i)=>{
                    return(
                        <div className="mt-5" key={i} style={{borderBottom:"5px solid indigo"}}>
                            <h2 className="mb-5">
                                <span className="bg-primary">
                                    Order ID: {o._id}
                                </span>
                            </h2>
                            <ul className="list-group mb-2">
                                <li className="list-group-item">
                                    {showStatus(o)}
                                </li>
                                <li className="list-group-item">
                                    Transaction ID: {o.transaction_id}
                                </li>
                                <li className="list-group-item">
                                    Amount: ${o.amount}
                                </li>            
                                <li className="list-group-item">
                                    Ordered by: {o.user.name}
                                </li>             
                                <li className="list-group-item">
                                    Ordered on: {moment(o.createdAt).fromNow()}
                                </li>
                                <li className="list-group-item">
                                    Delivery address: {o.address}
                                </li>                                
                            </ul>

                            <h3 className="mt-4 mb-4 font-italic">
                                Total products in the order: {o.products.length}
                            </h3>

                            {o.products.map((p,pI)=>(
                                <div className="mb-4" key={pI} style={{padding:'20px', border: '1px solid indigo'}}>
                                    {showInput('Product name', p.name)}
                                    {showInput('Product price', p.price)}
                                    {showInput('Product total', p.count)}
                                    {showInput('Product Id', p._id)}
                                </div>
                            ))}
                        </div>
                    )
                })}
                  <Link to="/admin/dashboard">Back to Dashboard</Link>
        </div>
        </div>
     </Layout>
    )
}
export default Orders;