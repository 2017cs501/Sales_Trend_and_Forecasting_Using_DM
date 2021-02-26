import React, { Component } from 'react'
import axios from 'axios'
import Menubar from '../Menubar'
import Footer from '../Footer'
import Setting_Menu from '../Setting_Menu'
import Cookies from 'js-cookie'
import {Link,Redirect} from 'react-router-dom'
export default class Uplift_Modeling extends Component {
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
        <Menubar name="UP"/>
        <div class="content-wrapper">
        <div class="page-content fade-in-up">
        <div class="registration-form">
        <div className="container">
        <h1 style={{textAlign:'center'}}>Uplift Modeling</h1>    

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
