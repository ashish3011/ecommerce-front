import React,{useState,useEffect} from 'react';
import Layout from "../core/Layout";
import { isAuthenticated} from '../auth';
import { getProduct,updateProduct, getCategories} from './apiAdmin';
import { Redirect } from 'react-router-dom';



const UpdateProduct=({match})=>{
    const [values,setValues]=useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:'',
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:''
    })

    const {user,token}=isAuthenticated()

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    }=values

    const init=(productId)=>{
        getProduct(productId).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,
                    name:data.name,
                    description:data.description,
                    price:data.price,
                    category:data.category,
                    shipping:data.shipping,
                    quantity:data.quantity,
                    formData:new FormData()})
                initCategories()   
            }
        })
    }

    const initCategories=()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({categories:data,formData:new FormData()})
            }
        })
    }

    useEffect(()=>{
        init(match.params.productId)

    },[])

    const handleChange=name=>event=>{
        const value=name==='photo'?event.target.files[0]:event.target.value
        formData.set(name, value)
        setValues({...values,[name]:value})
    }

    const clickSubmit=(event)=>{
        event.preventDefault()
        setValues({...values,error:'',loading:true})
       // if(name.length===0 && description.length===0 &&)
        updateProduct(match.params.productId,user._id,token,formData)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    name:'',
                    description:'',
                    price:'',
                    quantity:'',
                    photo:'',
                    loading:false,
                    createdProduct:data.name,
                    redirectToProfile:true,
                    error:''
                })
            }
        })
    }

    const newPostForm =()=>(
        <form className="mb-3">
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                <input type="file" onChange={handleChange('photo')} name="photo" accept="image/*"/>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" required value={name} onChange={handleChange('name')}  />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea className="form-control" value={description} required onChange={handleChange('description')}  />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" className="form-control" value={price} onChange={handleChange('price')}  />
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select className="form-control" required onChange={handleChange('category')}  >
                    <option >Please select</option>
                    {categories && categories.map((c,i)=>(<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number" className="form-control" value={quantity} onChange={handleChange('quantity')}  />
            </div>
            
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select className="form-control" onChange={handleChange('shipping')}  >
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>Update Product</button>
        </form>
    )

    const showError=()=>(
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
        </div>
    )

    const showSuccess=()=>(
        <div className="alert alert-info" style={{display:createdProduct?'':'none'}}>
                <h2>{`${createdProduct}`} is updated!</h2>
            </div>
    )

    const showLoading=()=>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )

        const redirectUser=()=>{
            if(redirectToProfile){
                if(!error){
                    return <Redirect to="/"/>
                }
            }
        }

    return(
        <Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new product?`} >
        <div className="row">
             <div className="col-md-8 offset-md-2">
              {showLoading()}
              {showSuccess()}
              {showError()}
               {newPostForm()}
               {redirectUser()}
             </div>
        </div>
        
     </Layout>
    )
}

export default UpdateProduct;