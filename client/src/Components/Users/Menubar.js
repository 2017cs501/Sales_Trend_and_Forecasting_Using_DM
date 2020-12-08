import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
export default class Menubar extends Component {
    logOut=()=>{
        Cookies.remove('token')
        this.setState({redirect:'/login'})
    }
    state={
        redirect:null,
        records:[]
    }
    get_Profile_info()
    {
        axios.get('/profile_info',{headers:{token:Cookies.get('token')}})
        .then(responce=>{
            this.setState({records:responce.data.profile})
        })
    }
    componentDidMount()
    {
       this.get_Profile_info()
    }
    render() {
        if(this.state.redirect)
        {
            return <Redirect to="/login"/>
        }
        return (
            <div>
        <header class="header">
            <div class="page-brand">
                <Link class="link" to="/user_panel">
                    <span class="brand">Sales 
                        <span class="brand-tip">&nbsp;Forecasting</span>
                    </span>
                </Link>
            </div>
            <div class="flexbox flex-1">
                <ul class="nav navbar-toolbar">
                    <li>
                        <a class="nav-link sidebar-toggler js-sidebar-toggler"><i class="ti-menu"></i></a>
                    </li>
                </ul>
                <ul class="nav navbar-toolbar ">
                    <li class="dropdown dropdown-user">
                        <a class="nav-link dropdown-toggle link" data-toggle="dropdown">
                            <img src={process.env.PUBLIC_URL+"dist/assets/img/admin-avatar.png"} />
                    <span></span>{this.state.records.uname}<i class="fa fa-angle-down m-l-5"></i></a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <Link class="dropdown-item" to="user_profile"><i class="fa fa-user"></i>Profile</Link>
                            <li class="dropdown-divider"></li>
                            <Link class="dropdown-item" to="/login" onClick={this.logOut}><i class="fa fa-power-off"></i>Logout</Link>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
        <nav class="page-sidebar fixed" id="sidebar">
            <div id="sidebar-collapse">
                <div class="admin-block d-flex">
                    <div>
                    <img src={process.env.PUBLIC_URL+"dist/assets/img/admin-avatar.png"} width="45px"/>
                    </div>                    
                    <div class="admin-info">
                    <div class="font-strong">{this.state.records.uname}</div><small>Administrator</small></div>
                </div>
                <ul class="side-menu metismenu">
                    <li>
                        <Link class="active" to="/user_panel"><i class="sidebar-item-icon fa fa-th-large"></i>
                            <span class="nav-label">Dashboard</span>
                        </Link>
                    </li>
                    <li class="heading">FEATURES</li>
                    
                    <li>
                        <Link to="/user_manage_packages"><i class="sidebar-item-icon fa fa-cubes"></i>
                            <span class="nav-label">Manage Pachages</span></Link>
                    </li>
                    <li>
                        <Link to="/user_manage_packages"><i class="sidebar-item-icon fa fa-tree"></i>
                            <span class="nav-label">{this.state.records.category}</span></Link>
                    </li>
                    <li>
                        <Link to="/user_manage_packages"><i class="sidebar-item-icon fa fa-shopping-basket"></i>
                            <span class="nav-label">Market Basket Analysis</span></Link>
                    </li>
                    <li>
                        <Link to="/user_manage_packages"><i class="sidebar-item-icon fa fa-balance-scale"></i>
                        <span class="nav-label">Market Basket Analysis</span></Link>
                    </li>
                    <li>
                        <Link to="/user_profile">
                        <i class="sidebar-item-icon fa fa-user-o"></i>
                        <span class="nav-label">My Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/login' onClick={this.logOut}>
                        <i class="sidebar-item-icon fa fa-sign-out"></i>
                        <span class="nav-label">Log Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
            </div>
        )
    }
}