import React from 'react';
import { BrowserRouter ,Route, Switch } from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard'
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard'
import Addcategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'




// here addcategory , addproduct is a component so when ever admin wil router to specific path
// i.e create/product such component will will render and perform the following operation






// we use privateroute here to know and show specigic page to authnticated user only
const Routes = () =>{
    return(
        <BrowserRouter>
        <Switch>
            <Route path ="/" exact component={Home}></Route>
            <Route path ="/signin" exact component={Signin}></Route>
            <Route path ="/signup" exact component={Signup}></Route>
            <Route path ="/shop" exact component={Shop}></Route>
            <Route path ="/product/:productId" exact component={Product}></Route>
            <Route path ="/cart" exact component={Cart}></Route>

            <PrivateRoute path ="/user/dashboard" exact component={Dashboard} />
            <AdminRoute path ="/admin/dashboard" exact component={AdminDashboard} />
            <AdminRoute path ="/create/category" exact component={Addcategory} />
            <AdminRoute path ="/create/product" exact component={AddProduct} />

        </Switch>
    </BrowserRouter>
    );
}
export default Routes;
