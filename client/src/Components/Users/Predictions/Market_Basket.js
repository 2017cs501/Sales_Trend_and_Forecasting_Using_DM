import React, { Component } from 'react'
import Menubar from '../Menubar'
import Footer from '../Footer'
import Setting_Menu from '../Setting_Menu'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
export default class Market_Basket extends Component {
    state={
        redirect:null
    }
    render() {
        if(!Cookies.get('token'))
        {
            this.setState({redirect:'/login'})
        }
        if(this.state.redirect)
        {
            return <Redirect to="/login"/>
        }
    return (
        <body class="fixed-navbar">
        <div class="page-wrapper">
        <Menubar name="AFZ"/>
        <div class="content-wrapper">
        <div class="page-content fade-in-up">
        <div class="registration-form">
        <div className="container">
        <h1 style={{textAlign:'center'}}>Market Basket Analysis</h1>    

     </div>
     </div>
    </div>
    <Footer/>
    </div>
    </div>
    <Setting_Menu/>
</body>
        )
    }
}
