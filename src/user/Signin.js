import React,{useState} from 'react';
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout';
import {signin,authenticate,isAuthenticated} from '../auth'



    const Signin =()=>{

        const [values,setValues] = useState({
            email:'',
            password:'',
            error:'',
            loading:false,
            redirectToReferrer:false
        })

        // here we use redirectToReferrer because when it will be true user will be redirected to home page

// all the fields are streoed in value which is an object so we have to destructure to grab individual values

        const {email,password,loading,error,redirectToReferrer} = values

// here we are destructing user and tring to divert user to admin if role === 1 (i.e admin) fir that we are destricting


        const {user} = isAuthenticated();
       
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
            setValues({...values,error:false,loading:true});
          signin({email,password}) 
     .then(data=>{
        // console.log('my data in signin',data);
           if(data.error || data.err === "user doesnot exist"){
                setValues({...values,error:data.error,loading:false});
            }
            else{
                authenticate(data,()=>{
                    setValues({...values,redirectToReferrer:true})    
                })
            } 
        })
        
        
        // we are passing all value as an object to user parameter
           // signup({name:name,email:email,password:password})
            // when key and values name are same so we can only write values
        
        }
    const signinForm =()=>(
        <form>

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

    const showLoading =()=>
         loading && (<div className="alert alert-info"><h2>Loading...</h2></div>);    


         // here we are redirecting user based on hos role 
         // we have done authentication already so now if the user role is 1(admin then it will be redirected to admin dashboard else to user dashboard)
         const redirectUser =()=>{
             if(redirectToReferrer){
                 if(user && user.role === 1)
                   return <Redirect to="/admin/dashboard" />
             }else {
                 return <Redirect to="/user/dashboard" />
             }
             
             }
             if(isAuthenticated()){
                return <Redirect to="/" />;
         }
        

    

    return(
        <Layout
        title="Signin"
        description="Signin to Dashboard"
        className="container col-md-8 offset-md-2">
        {showLoading()}
        {showError()}
        {signinForm()}
        {redirectUser}
     </Layout>
    )

}
       
   


export default Signin;