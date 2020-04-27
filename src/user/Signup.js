import React,{useState} from 'react';
import { Link } from 'react-router-dom'

import Layout from '../core/Layout';
 import {signup} from '../auth'


    const Signup =(user)=>{

        const [values,setValues] = useState({
            name:'',
            email:'',
            password:'',
            error:'',
            success:false
        })

// all the fields are streoed in value which is an object so we have to destructure to grab individual values

        const {name,email,password,success,error} = values
       
// it is higer order function where one function return anither function 
// also here name is like a parameter in which every name,email,apssword is copied to grab current valeu to update the sate
// here we use ...values to tell about our previous state values
        const handleChange = name => event =>{
            setValues({...values,error:false,[name]:event.target.value});
            
        }
        //  now we have to send data to backend when user click on submit button so it can be done by this method
        // we used preventDefault to stop auto reload of the page after an action is performed
        
        const clickSubmit =(event)=>{
            event.preventDefault();
            setValues({...values,error:false});
            signup({name,email,password})
         //console.log("this is my data ",data);
            
    .then(data=>{
       //  console.log(data);
          if(data.error){
                setValues({...values,error:data.error,success:false});
            }
            else{
                setValues({...values,name:'',email:'',password:'',error:'',success:true})
            }
            
        }) 
        // we are passing all value as an object to user parameter
           // signup({name:name,email:email,password:password})
            // when key and values name are same so we can only write values
        
        }
    const signupForm =()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label> 
                <input onChange={handleChange('name')}
                type ="text" className="form-control"
                value={name}
                
                />
        
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label> 
                <input  onChange={handleChange('email')}
                type ="email" className="form-control"
                value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label> 
                <input   onChange={handleChange('password')}
                type ="password" className="form-control" value={password}/>
            </div>
            <button  onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );

    const showError =()=>{
       return <div className="alert alert-danger" style={{display:error?'':'none' }}>{error}</div>
    }

    const showSuccess =()=>{
       return  <div className="alert alert-danger" style={{display:success?'':'none' }}>new account is created .Please <Link to="/signin">Signin</Link></div>
    }
        

    

    return(
        <Layout
        title="Signup"
        description="Signup to node React E-commerce App"
        className="container col-md-8 offset-md-2"
        
    >
        
        {showSuccess()}
        {showError()}
        {signupForm()}
        
    
     </Layout>
    )

}
       
   


export default Signup;