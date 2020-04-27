import React,{useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';


const AddCategory =()=>{
    const [name,setName] = useState('')
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)

    // destrucre user and info from localstorage

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
    }

    const newCategoryForm =()=>(
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChnage={handleChange} value={name} autoFocus/>
           <button className="btn btn-outline-primary mt-3">Create Category</button>
            </div>
        </form>
    );
    return(
        <Layout title="Add a new category" description={`welcome ${name} ready to add a new category`} >
         <div className="row">
             <div className="col-md-8 offset-md-2">
                {newCategoryForm()}
             </div>

         </div>
         
        </Layout>
    )


}

export default AddCategory;


