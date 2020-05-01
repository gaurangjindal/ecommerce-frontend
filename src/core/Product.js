import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import { read} from './apicore'
import Card from './Card'

// here we have to display details of single product so first we have to grab product id from url
// first we need to make a statst to keep track of products
// here we are using useEffect because when ever the page is loaded so in that case product id is send to backend and display onto the screen

const Product =(props)=>{
    const [product,setProduct] = useState({})
    const [error,setError] = useState(false)

    const loadSingleProduct = productId =>{
        read(productId).then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setProduct(data);
            }
        })
    }

    useEffect(()=>{
        // this is how we can grab productid from url
        const productId = props.match.params.productId
       // console.log('my id',productId);
        loadSingleProduct(productId);
    },[])


    return (
        <Layout title={product && product.name} 
        description={product && product.description && product.description.substring(0,100)} 
        className="container-fluid">
            
       
        <div className="row">
        {
            product && 
            product.description && 
            <Card product={product} showViewProductButton={false}/>
        }
        </div>
    </Layout>
    )
}

export default Product;