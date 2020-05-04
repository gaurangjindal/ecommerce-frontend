import {API} from '../config'




export const signup =(user)=>{
 //    console.log(user);
   return  fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user) // we cannot directly send object to backend theorforre we are sednign json
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


 export const signin =(user)=>{
     console.log('my user->',user);
   return  fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user) // we cannot directly send object to backend theorforre we are sednign json
    })
    .then(response =>{
        return response.json();
    })
    .then(data=>{
      //  console.log('my signin data',data);
        return data;
    })
    .catch(err=>{
        console.log(err);
    })
 }
 

// using this we are storing jwt token in local storage
 export const authenticate =(data,next)=>{
     if(typeof window!='undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next();
     }
 }


 export const signout =(next) =>{
    if(typeof window!='undefined'){
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`,{
            method:"GET",
        })
        .then(response=>{
            console.log('signout',response)
        })
        .catch(err=>{
            console.log(err);
        })
     }
 }



// we used this function once the user loggedin then it will help to show signin,signup signout button accordingly 
// we will do this thing using jwt token
export const isAuthenticated =()=>{
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
       return  false
    }
}
