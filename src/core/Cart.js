import React,{useState,useEffect} from 'react';
import Layout from './Layout'
import Card from './Card'
import {getCart , removeItem} from './CartHelper'
import { Link} from 'react-router-dom'
import Checkout from './Checkout'


const Cart =() =>{
    const [items,setItems] = useState([])
    const [run, setRun] = useState(false);
    const [stateChecker,setChecker] = useState(0);
    const [cartUpdater, setCartUpdater] = useState(0);

    const handleCheck =()=>{
        setChecker(stateChecker+1);
    }

    const handleUpdate = () => {
        setCartUpdater(cartUpdater+1);
    }

    useEffect(()=>{
       // console.log('max deep..')
        setItems(getCart())
    },[run,stateChecker])


    const showItems = items =>{
        return(
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr/>
                {items.map((product,i)=>(<Card key={i} product={product} 
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
                setRun={setRun}
                run={run}
                updater={handleCheck}
                cartHelper = {handleUpdate}
                
               />))}
            </div>
        )
    }

    const noItemsMessage =()=>(
        <h2>Your cart is empty <br/><Link to='/shop'>Continue Shopping</Link></h2>
    )


    return (
        <Layout title="Shopping Cart" description="Manage your cart" className="container-fluid">
                       
        <div className="row">
            <div className="col-6">
                {items.length >0 ? showItems(items) : noItemsMessage()}
            </div>

            <div className="col-6">
                <h2 className="mb-4">Your Cart summary</h2><hr/>
                <Checkout products={items}/>
            </div>
        </div>
    </Layout>
    )
}

export default Cart;