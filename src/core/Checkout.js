import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import {getProducts , getbraintreeClientToken,processPayment,createOrder} from './apicore'
import Card from './Card'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import Dropln from "braintree-web-drop-in-react";
import {emptyCart} from './CartHelper'


const Checkout =({products})=>{

    const [data,setData] = useState({
        success:false,
        clientToken:null,
        error:'',
        instance:{},
        address:''
    })


    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId,token) =>{
        getbraintreeClientToken(userId,token).then(data=>{
            if(data.error){
                setData({...data,error:data.error})
            }else{
                setData({clientToken:data.clientToken});
            }
        })
    }


    useEffect(()=>{
        getToken(userId,token)
    },[])


    const getTotal =()=>{  
        let tempCart = {};
        if (localStorage.getItem('cart')) {
            tempCart = JSON.parse(localStorage.getItem('cart')); //sideeffect application will be stuck here

            let total = 0;
            if(tempCart.length === 0) {
                return 0;
            }

            tempCart.forEach((ele) => {
                console.log(ele);
                    if(ele.count)
                    {
                        total+= ele.count * ele.price;
                    }
            })
            
            return total;
           // return tempCart[0].;
        }
        else {
            return 0;
        }
       
        return 0;
    }

    const showCheckout=()=>{
        return isAuthenticated() ? (
        <div >{showDropIn()}</div>
        ) : (<Link to="/signin">
            <button className="btn btn-primary">
                Sign in  to checkout
            </button>
        </Link>)
    }

    let deliveryAddress = data.address

    const buy =()=>{
        //send nonce to server 
        // nince = data.instance.request.oaymentmethod

        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then(data=>{
            //console.log(data)
            nonce = data.nonce
            // once you have (card type,card number) send nonce as paymentmethod
          
            // console.log('send nonce and total to process',nonce,getTotal(products) )
            const paymentData ={
                paymentmethodNonce : nonce,
                amount:getTotal(products)
            }
           //console.log('my data before', data);
            processPayment(userId,token,paymentData)
            .then(response =>{
                
                const createOrderData={
                    products:products,
                    transaction_id:response.transaction_id,
                    amount:response.amount,
                    address: deliveryAddress
                }

                createOrder(userId,token,createOrderData)
                
                console.log(response);
                setData({...data,success:true});
                //console.log('data after update', data);
                // here once the payment is done we have to 
                // empty cart abd create order
                emptyCart(()=>{
                    console.log('cart is empty');
                    setData({loading:false,success:true});
                })
            })
            .catch(error=>console.log(error))
        
        }).catch(error=>{
            //console.log('dropin error',error)
            setData({...data,error:error.message});
        })
    }



const handleAddress=(event)=>{
    setData({...data,address:event.target.value})
}

    const showDropIn =()=>(
        <div onBlur={()=> setData({...data,error:''})}>
            {data.clientToken !==null && products.length >0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address</label>
                        <textarea 
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="type your delivery address"
                        />
                    </div>
                    <Dropln options={{
                        authorization:data.clientToken
                    }} onInstance={instance =>(data.instance=instance)}/>
                    <button onClick={buy} className="btn btn-success btn-block">Proceed to Pay</button>
                </div>
            ) : null}
        </div>
    )


    const showError =(error)=>(
        <div className="alert alert-danger" style={{display:error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess =(success)=>(
        <div className="alert alert-success" style={{display:success ? '' : 'none'}}>
            Thank your for Payment 
        </div>
    )

    return(
    <div>
        <h2>Total : Rs.{getTotal()}</h2>
        {showSuccess(data.success)}
        {showError(data.error)}
        {showCheckout()}

    </div>
    )
}


export default Checkout;