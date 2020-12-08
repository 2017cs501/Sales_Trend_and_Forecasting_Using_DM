import React, { Component } from 'react'
import MainPage from './Users/MainPage'
import Login from './Users/Login'
import Admin from './Admin/AdminLogin'
import Signup from './Users/Signup'
import ResetPassword from './Users/ResetPassword'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import ResetAdminPassword from './Admin/ResetAdminPassword'
import Dashboard from './Users/Dashboard'
import Admin_Profile from './Admin/Admin_Profile'
import Add_New_Admin from './Admin/Add_New_Admin'
import Admin_Panel from './Admin/Admin_Panel'
import Manage_Actions from './Admin/Manage_Actions'
import Manage_Customers from './Admin/Manage_Customers'
import Manage_Packages from './Admin/Manage_Packages'
import Messages from './Admin/Messages'
import Notifications from './Admin/Notifications'
import Manage_Plans from './Admin/Manage_Plans'
import User_Panel from './Users/User_Panel'
import User_Profile from './Users/User_Profile'
import User_Manage_Packages from './Users/User_Manage_Packages'

export default class Root extends Component {
    render() {
        return (
            <>
            <Router>
                <Switch>
                    {/* For Users Routes */}
                    
                    <Route path="/" exact><MainPage/></Route>
                    <Route path="/login" exact><Login/></Route>
                    <Route path="/signup" exact><Signup/></Route>
                    <Route path="/reset_password" exact><ResetPassword/></Route>
                    <Route path="/reset_admin_password" exact><ResetAdminPassword/></Route>
                    <Route path="/dashboard" exact><Dashboard/></Route>
                    <Route path="/user_panel" exact><User_Panel/></Route>
                    <Route path="/user_profile" exact><User_Profile/></Route>
                    <Route path="/user_manage_packages" exact><User_Manage_Packages/></Route>

                    {/* For Admin Routes */}
                    
                    <Route path="/admin" exact><Admin/></Route>
                    <Route path="/add_new_admin" exact><Add_New_Admin/></Route>
                    <Route path="/admin_panel" exact><Admin_Panel/></Route>
                    <Route path="/admin_profile" exact><Admin_Profile/></Route>
                    <Route path="/manage_actions" exact><Manage_Actions/></Route>
                    <Route path="/manage_packages" exact><Manage_Packages/></Route>
                    <Route path="/manage_customers" exact><Manage_Customers/></Route>
                    <Route path="/manage_plans" exact><Manage_Plans/></Route>
                    <Route path="/messages" exact><Messages/></Route>
                    <Route path="/notifications" exact><Notifications/></Route>
                    
                </Switch>
            </Router>  
            </>
        )
    }
}
