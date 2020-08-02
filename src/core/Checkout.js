import React,{useState,useEffect} from 'react';
import { createOrder } from './apiCore';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import {API} from '../config';
import {payment} from "./apiCore";
import {emptyCart} from "./cartHelper"
const Checkout=({ products, setRun = f => f, run = undefined })=>{

    const [data,setData]=useState({
        success:false,
        clientToken:null,
        loading:false,
        error:'',
        instance:{},
        address:''
    })

    const userId=isAuthenticated() && isAuthenticated().user._id
    const token=isAuthenticated() && isAuthenticated().token
    const {user}=isAuthenticated()
    console.log(userId)
    console.log(user)

    let deliveryAddress=data.address
    let deliveryProducts=data.products
    let orderId=''
    const onClickPay=()=>{

        const createOrderData={
            products:products,
            amount:getTotal(deliveryProducts),
            address:deliveryAddress
        }
        createOrder(userId,token,createOrderData)
        .then(response=>{
            orderId=response._id
            console.log(orderId)
            setData({...data,success:response.success})
            emptyCart(()=>{
                setRun(!run)
                console.log('payment success and empty cart')
                setData({loading:false,success:true})

            })
        })
        .catch(err=>{
            console.log(err)
            setData({loading:false})
        })



        const data={
            user_id: userId,
            email: user.email,
            buyer_name: user.name,
            amount: getTotal(products),
            purpose: "Order Payment",
            redirect_url:`${API}/callback/${userId}`, ///${OrderId}
            webhook: "http://www.example.com/webhook/",
        }
        console.log(data.user_id,data.email)
        payment(userId,token,data).then(data1=>{
            if(data1.error){
                setData({...data,error:data1.error,loading:false})
            }else{
                console.log(data1)

                
                window.location.href=data1

             
            }})
            .catch(err=>{
                console.log(err)
                setData({loading:false})
            })

            }

    const getTotal=()=>{
        return products.reduce((currentValue,nextValue)=>{
            return currentValue+nextValue.count*nextValue.price;
        },0)
    }


    const handleAddress=event=>{
        setData({...data,address:event.target.value})
    }


    const showCheckout=()=>{
        return isAuthenticated() && getTotal()>0 ? (
            <div className="address">
            <input type="text" placeholder="Address" className="input-address" onChange={handleAddress}/>

            <button className="btn btn-primary pay-btn" onClick={onClickPay} >Pay</button>
            </div>
        ):(
            <div></div>
        )
        }


    const showError=error=>(
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
        </div>
    )

    const showSuccess=success=>(
        <div className="alert alert-info"
         style={{display:success?'':'none'}}>
            Thanks! Your payment was successful!
        </div>
    )

    const showLoading=(loading)=>loading && <h2>Loading...</h2>

    return <div>
        
        <h2 className="float-left">Total: ${getTotal()}</h2>
       <Link to="/shop"><button className="btn btn-primary btn-lg mb-4 float-right">Continue Shopping</button></Link> 
        
        {showLoading(data.loading)}
    {showError(data.error)}
    {showSuccess(data.success)}
    {showCheckout()}
       
    </div>

}

export default Checkout;