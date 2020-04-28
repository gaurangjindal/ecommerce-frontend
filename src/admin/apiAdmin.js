import {API} from '../config'



// for creating new category we should be thr admin and for this we need user id,token and category in our post req
// because we alyeady authenticate user that either he is admin or not
export const createCategory =(userId,token,category)=>{
 
   return  fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category) // we cannot directly send object to backend theorforre we are sednign json
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




// here content type is not json becaue we are also sending pohto of product so we have created form for this in backend

 
export const createProduct =(userId,token,product)=>{
 
   return  fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:product // here we we donr have any josn data so we dont have to do json.stringify

    })
    .then(response =>{
        return response.json();
    }).then(data=>{
       // console.log('my data',data);
        return data;
    })
    .catch(err=>{
        console.log(err);
    })
 }


 export const getCategory =() => {

    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));

 }