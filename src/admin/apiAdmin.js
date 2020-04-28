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
