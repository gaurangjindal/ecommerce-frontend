import React,{useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin'


// this is a  react component

const AddCategory =()=>{
    const [name,setName] = useState('')
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)

    // destructure user and info from localstorage

    const {user,token} = isAuthenticated();
// text-muted is a class of bootstrap which give grey light color

// here we need two method onsubmit and onchange i.e onsubmiting the form the data shpuld be saved to database and onchange will render to change the current state i.e updated value

    const handleChange =(e)=>{
        setError('')
        setName(e.target.value);
    }


    const clickSubmit =(e) =>{
        e.preventDefault();
        setError('')
        setSuccess(false);
        //make requst to api to create category
        // now to create new category we need to create new method which reqest backend api to create it in database
        createCategory(user._id,token,{name})
        .then(data =>{
            if(data.error){
                setError(true)
            }else{
                setError("");
                setSuccess(true);
            }
        })
    }

    const newCategoryForm =()=>(
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
            </div>
            <button className="btn btn-outline-primary ">Create Category</button>

        </form>
    );


    const showSuccess =()=>{
        if(success){
            return <h3 className="text-success">{name} is created</h3>
        }
    }

    const showError =()=>{
        if(error){
            return <h3 className="text-danger">{name} should have unique name</h3>
        }
    }

    const goBack =()=>{
       return(
        <div className="mt-5">
        <Link to="/admin/dashboard" className="text-danger">Back to Dashboard</Link>
         </div>

       ) 
       }

    
    return(
        <Layout title="Add a new category" description={`welcome ${user.name} ready to add a new category`} >
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



