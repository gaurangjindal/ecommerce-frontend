import React, {Component } from 'react';
import {Route,Redirect}  from 'react-router-dom';
import {isAuthenticated} from './index';


// here we are authenticating the user if the user is authenticated then we will render component and direct to that componant path with props else we will redirect the user tologin page again

const AdminRoute =({component:Component,...rest})=>(
    <Route {...rest} render={props=>isAuthenticated() && isAuthenticated().user.role === 1? (<Component{...props} />) : (<Redirect  to={{pathname:'/signin',sate:{from:props.location}}}/>) }/>


)


export default AdminRoute;