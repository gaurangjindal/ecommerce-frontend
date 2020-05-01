import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {getProducts} from './apicore'
import Card from './Card'


const Checkout =({products})=>{
    return(
    <div>{JSON.stringify(products)}</div>
    )
}


export default Checkout;