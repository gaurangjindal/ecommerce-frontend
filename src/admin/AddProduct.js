import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProduct , getCategory} from './apiAdmin'


// this is a product component and we are getting create product function from apiAdmin.js file
// here will render that function like view and perfom operation on it.
// step-1  destructure the data so that we can easily access it
// step-2  create a state of product(or anything which will be changed as per user)
// define all fields in the state
// step-3 (optional) destructure states values
// step-4 now create actual form where we want using function(bcoz we used state)
// step-5 after creating form we will create onchange function and set the current value entered by user(which is dynamic)
//step-6 Now once we updated our state to current value we will be sending our data to backend using fetch api(post method)


const AddProduct =()=>{
    

    const [values,setValues] = useState({
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

    const {user,token} = isAuthenticated();
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

    } = values

    // load category and set form data from getcategory method defined in apiadmin using fetch api

    const init =() =>{
        getCategory().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,categories:data,formData:new FormData()})
            }
        })
    }

    // here we updated the form data using useeffect
    
    useEffect (()=>{
        init();
    },[])

    //higher order function
    const handleChange = name => event =>{
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }


    const clickSubmit =(event)=>{
        event.preventDefault()
        setValues({...values,error:'',loading:true})
     //   console.log('create product ->',createProduct());
        createProduct(user._id,token,formData)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    name:'',
                    description:'',
                    photo:'',
                    price:'',
                    quantity:'',
                    loading:false,
                    createdProduct:data.name
                })
            }
        })
    }



    const newPostForm =()=>(
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                <input type="file" onChange={handleChange('photo')} name="photo" accept="image"/>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" values={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Product Description</label>
                <textarea onChange={handleChange('description')} className="form-control" values={description}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" onChange={handleChange('price')} className="form-control" values={price}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select  onChange={handleChange('category')} className="form-control" >
                    <option >Please Select</option>
    {categories && categories.map((c,i) => (<option key ={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="text" onChange={handleChange('quantity')} className="form-control" values={quantity}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select  onChange={handleChange('shipping')} className="form-control" >
                    <option >Please Select</option>
                    <option value="0" >No</option>
                    <option value="1" >Yes</option>
                </select>
            </div>
            <button className="btn btn-outline-primary"> Create Product</button>
        </form>
    )

        const showError =()=>(
            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
        )

        const showSuccess =()=>(
            <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
                <h2>{`${createdProduct} is created`}</h2>
            </div>
        )


        const showLoading =()=>(
            loading && (<div className="alert alert-success">Loading...</div>)
        )


return(
    <Layout title="Add a new Product" description={`welcome ${user.name} ready to add a new Product`} >
         <div className="row">
             <div className="col-md-8 offset-md-2">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}
             </div>

         </div>
         
        </Layout>
)


}

export default AddProduct;