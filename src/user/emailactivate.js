import React,{useState} from 'react';
import {useParams,Link} from 'react-router-dom';
import Layout from "../core/Layout";

import {verifyEmail} from '../auth/index';



const Active=()=>{
    const [values,setValues]=useState({
        error:'',
        success:false
    })

    const {success,error}=values

    let {email,token}=useParams()
        console.log(email,token)
    verifyEmail({email,emailToken:token})
    .then(data=>{
        if(data.error){
            setValues({error:data.error,success:false})
        }else{
            setValues({
                error:'',
                success:true
            })
        }
    })

    const showError=()=>(
        <div className="alert alert-danger" style={{display:error?'':'none',textAlign:"center"}}>
            {error}
        </div>
    )

    
    const showSuccess=()=>(
        <div className="alert alert-info" style={{display:success?'':'none',textAlign:"center"}}>
             Account has succesfully verified. Please proceed to <Link to="/signin">Signin</Link>
        </div>
    )

    return(
        <Layout title="Email-Activation" description="Verify Email to Node React E-commerce App" className="container col-md-8 offset-md-2">
            {showSuccess()}
             {showError()}
        </Layout>
    )
}

export default Active;