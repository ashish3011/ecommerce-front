import React,{useState} from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory=()=>{
    const [name,setName]=useState('')
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)

    const {user,token}=isAuthenticated()

    const handleChange=(e)=>{
        setError('')
        setName(e.target.value)
    }
    const clickSubmit=(e)=>{
        e.preventDefault()
        setError('')
        setSuccess(false)
        
        if(name.length===0){
            setError("Category Name must be required!")
        }else{
            createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(true)
            }else{
                setError('')
                setSuccess(true)
                
            }
        })

        }
        
    }


    const newCategoryForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" required onChange={handleChange} value={name} autoFocus/>
                   </div>
                   <button className="btn btn-outline-primary" onClick={clickSubmit}>Create Category</button>
         
        </form>
    )

    const showSuccess=()=>{
        if(success){
        return <h3 className="text-success">{name} is created</h3>
        }
    }

    const showError=()=>{
        if(error){
        return <h3 className="text-danger">Category is should be unique.</h3>
        }
    }

    const goBack=()=>(
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    )

    return(
        <Layout title="Add a new category" description={`G'day ${user.name}, ready to add a new category?`} >
        <div className="row">
             <div className="col-md-8 offset-md-2">
                 {showSuccess()}
                 {showError()}
                 
                 {newCategoryForm()}
                 {goBack()}
             </div>
        </div>
        
     </Layout>
    )

}

export default AddCategory;