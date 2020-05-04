import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {getProducts} from './apicore'
import Card from './Card'
import Search from './Search'


// here we are displaying products by sell and arrival
// step-1 we created empty state of sell,arrival and error that will eccoured
//step-2 we import getproducts where we fetched the data from db with query param we will sort the data
//step-3 we will use useeffect to render the compoent whenever these component mount

const Home =()=>{
    const [productsBySell,setProductsBySell] = useState([])
    const [productsByArrival,setProductsByArrival] = useState([])
    const [error,setError] = useState(false)

    const loadProductsBySell =()=>{
        getProducts('sold').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProductsBySell(data)
            }
        })
    }

    const loadProductsByArrival =()=>{
        getProducts('createdAt').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProductsByArrival(data)
            }
        })
    }


    // now we have to run thse two function when the component mounts

    useEffect(()=>{
        loadProductsByArrival()
        loadProductsBySell()
    },[])


    return (
        <Layout title="Home page" description="Node react e-commerce app " className="container-fluid">
            <Search/>
            <h2 className="mb-4">New Arrival</h2>

            <div className="row">
            {productsByArrival.map((product,i)=>(<Card key={i} product={product}/>))}

            </div>

            <h2 className="mb-4">Best sellers</h2>
            <div className="row">
                {productsBySell.map((product,i)=>(<Card key={i} product={product}/>))}
    
            </div>            
        
    </Layout>
    )
}
export default Home;