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