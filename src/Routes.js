import React from 'react';
import { BrowserRouter, Switch,Route} from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Active from "./user/emailactivate";
import Forgot from "./user/forgotPassword";
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from "./user/AdminDashboard";
import AdminRoute from './auth/AdminRoute';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from "./user/Profile";
import ManageProducts from './admin/ManageProduct';
import UpdateProduct from './admin/UpdateProduct';
import AddAdmin from './admin/AddAdmin';
const Routes=()=>{
    return ( 
        <div>
            <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/shop" exact component={Shop}/>
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/email-activate/:email/:token" exact component={Active}/>
                <Route path="/forgot" exact component={Forgot}/>
                <PrivateRoute path="/profile/:userId" exact component={Profile}/>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
                <AdminRoute path="/create/category" exact component={AddCategory}/>
                <AdminRoute path="/admin/orders" exact component={Orders}/>
               <AdminRoute path="/create/product" exact component={AddProduct}/>
               <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
               <AdminRoute path="/admin/products" exact component={ManageProducts}/>
               <AdminRoute path="/admin/adduser" exact component={AddAdmin}/>
                <PrivateRoute path="/cart" exact component={Cart}/>
 </Switch>
            </BrowserRouter>
        </div >
    )
}

export default Routes;