import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from "../core/Layout";
import {signup} from '../auth/index';
const Signup=()=>{
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    })

    const {name,email,password,success,error}=values

    const handleChange= name => event =>{
        setValues({...values,error:false,[name]:event.target.value});
    }

   

    const clickSubmit=(event) =>{
        
        event.preventDefault()
        setValues({...values,error:false})
        if(email.length===0 && name.length===0 && password.length===0){
            setValues({...values,error:"Please enter the information in respected field"})
        }
        else{
            signup({name,email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }else{
                setValues({
                    ...values,
                    name:'',
                    email:'',
                    password:'',
                    error:'',
                    success:true
                })
            }
        })
        }
        
    }

    const signUpForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" value={email} className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control"/>
            </div>
            <div className="float-right">
            <button onClick={clickSubmit} className="btn btn-primary btn-lg">
                Submit    
            </button> 
            
            </div>
            <div className="float-left">
                <p>Already a user? <Link to="/signin">Signin</Link></p>
                </div> 
        </form>
    )

    const showError=()=>(
        <div className="alert alert-danger" style={{display:error?'':'none',textAlign:"center"}}>
            {error}
        </div>
    )

    
    const showSuccess=()=>(
        <div className="alert alert-info" style={{display:success?'':'none',textAlign:"center"}}>
            New account is created. Please verify your email and proceed to <Link to="/signin">Signin</Link>
        </div>
    )

    return(
    <Layout title="Signup" description="Signup to Node React E-commerce App" className="container col-md-8 offset-md-2">
        {showSuccess()}
        {showError()}
        {signUpForm()}
    </Layout>
   )
}


export default Signup;