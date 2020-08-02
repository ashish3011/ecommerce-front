import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from "../core/Layout";

import {forgot,confirmPassword} from '../auth/index';

const Forgot=()=>{
    const [values,setValues]=useState({
        email:'',
        error:'',
        success:false,
        pRand:'',
        password:'',
        success1:'',
        final:true
    })

    const {success,error,email,pRand,password,success1,final}=values

    const handleChange= name => event =>{
        setValues({...values,error:false,[name]:event.target.value});
    }


    const clickSubmit=(event) =>{
        //console.log(email)
        event.preventDefault()
        setValues({...values,error:false,success:true})
        //console.log(email)
        if(email.length===0){
            setValues({...values,error:"Please enter the correct email"})
        }
        else{
            forgot({email})
        .then(data=>{
            if(data.error){
                console.log(data.error)
                setValues({...values,error:data.error,success:false})
            }else{
                setValues({
                    ...values,
                    error:'',
                    success:true
                })
            }
        })

        }
        
    }


    const clickSubmit1=(event)=>{
        event.preventDefault()
        setValues({...values,error:false,success:true})
        console.log(email,password,pRand)
        if(password.length===0 && pRand.length===0){
            setValues({...values,error:"Please enter the respective fields!",success:true})
        }
        else if(password.length<6 ){
            setValues({...values,error:"Please enter the password more than 6 characters",success:true})
        }else{
            confirmPassword({email,pRand,password})
            .then(data=>{
                if(data.error){
                    //console.log(data.error)
                    setValues({...values,error:data.error,success1:false,success:true,final:false})
                }else{
                    setValues({
                        ...values,
                        email:'',
                        error:'',
                        success1:true,
                        pRand:'',
                        password:'',
                        success:true,
                        final:false
                    })
                }
            })
        }
    }


    // const showSuccess1=()=>(
    //     <div className="alert alert-info" style={{display:success1?'':'none',textAlign:"center"}}>
    //          Your password has been succesfully changed, <Link to="/signin">Signin</Link>
    //     </div>
    // )

    const showError=()=>(
        <div className="alert alert-danger" style={{display:error?'':'none',textAlign:"center"}}>
            {error}
        </div>
    )

    
    const showSuccess=()=>(
     <div>
     <div className="alert alert-info" style={{display:success&&final?'':'none',textAlign:"center"}}>
             Please check Your mail and enter the OTP
        </div>
         <div className="alert alert-info" style={{display:success1?'':'none',textAlign:"center"}}>
                   Your password has been succesfully changed, <Link to="/signin">Signin</Link>
              </div>
              </div>
    )

    const forgotForm=()=>(
        <form>

            <div style={{display:success?'none':''}}>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" value={email} className="form-control"/>
            </div>
            <div className="d-flex justify-content-center">
            <button onClick={clickSubmit} className="btn btn-primary btn-lg">
                Submit    
            </button> 
            </div>
            </div>


            <div  style={{display:success?'':'none'}}>
            <div className="form-group">
                <label className="text-muted">OTP</label>
                <input onChange={handleChange('pRand')} type="text" value={pRand} className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">New Password</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control"/>
            </div>
            <div className="d-flex justify-content-center">
            <button onClick={clickSubmit1} className="btn btn-primary btn-lg">
                Submit    
            </button> 
            </div>
            
            </div>
        </form>

    )

    return(
        <Layout title="Forgot-Password" description="Forgot Password to Node React E-commerce App" className="container col-md-8 offset-md-2">
            {/* {showSuccess1()} */}
            {showSuccess()}
             {showError()}
             {forgotForm()}
        </Layout>
    )
}

export default Forgot;