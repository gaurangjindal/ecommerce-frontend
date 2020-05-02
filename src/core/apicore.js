import {API} from '../config';
import queryString from 'query-string'


export const getProducts =(sortBy) => {

    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));

 }


 export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

 export const getCategory =() => {

    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));

 }



 export const getFilteredProducts =(skip,limit,filters ={})=>{
 
const data ={
    limit,skip,filters
};

    return  fetch(`${API}/product/by/search`,{
         method:"POST",
         headers:{
             Accept:'application/json',
             "Content-Type":"application/json",
         },
         body:JSON.stringify(data) // we cannot directly send object to backend theorforre we are sednign json
     })
     .then(response =>{
         return response.json();
     }).then(data=>{
         return data;
     })
     .catch(err=>{
         console.log(err);
     })
  }



/* this is how query string work and give output

parsed.foo = 'unicorn';
parsed.ilike = 'pizza';
 
const stringified = queryString.stringify(parsed);
//=> 'foo=unicorn&ilike=pizza'

*/


  export const list =(params) => {

    const query =  queryString.stringify(params)

   // console.log(query);

    return fetch(`${API}/products/search?${query}`,{
        method:"GET"
    })
    .then(response =>{
        return response.JSON();
    })
    .catch(err => console.log(err));

 }


 export const read =(productId) => {

    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));

 }

 export const getbraintreeClientToken =(userId,token) => {

    return fetch(`${API}/braintree/getToken/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));

 }

 export const processPayment =(userId,token,paymentData) => {

    return fetch(`${API}/braintree/payment/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(paymentData)
        
    })
    .then(response =>{
       // console.log('my payment data',paymentData)
        return response.json();
        
    })
    .catch(err => console.log(err));

 }



 export const createOrder =(userId,token,createOrderData) => {

    return fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(createOrderData)
        
    })
    .then(response =>{
        console.log('my payment data',response.json());
        return response.json();
        
    })
    .catch(err => console.log(err));

 }