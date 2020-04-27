import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';


const AdminDashboard =()=>{
// here we are destructing all the details that isAuthenticated is having to use it in easily

    const {user :{_id,name,email,role}} = isAuthenticated()
    console.log('I am admin',role);


    const adminLinks =()=>{
        return(
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                 <li className="list-group-item">
                     <Link  className= "nav-link" to="/create/category">Create category</Link>
                     
                     </li>

                 <li className="list-group-item">
                     <Link className="nav-link" to="/create/product">Create product</Link>
                 </li>
             </ul>
            </div>
        )
    }

    const adminInfo =()=>{
        return(
            <div className="card mb-5">
             <h3 className="card-header">Admin Information</h3>
             <ul className="list-group">
                 <li className="list-group-item">{name}</li>
                 <li className="list-group-item">{email}</li>
                 <li className="list-group-item">{role===1 ? "Admin":"Registered User"}</li>
             </ul>
         </div>
        )
    }


    return(
        <Layout title="Dashboard" description={`welcome ${name}!`} className="container-fluid">
         <div className="row">
             <div className="col-3">
                {adminLinks()}
             </div>
             <div className="col-9">
                {adminInfo()}
             </div>

         </div>
         
        </Layout>
    )
}

export default AdminDashboard;