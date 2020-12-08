import React, { Component } from 'react'
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
export default class Notifications extends Component {
    state={
        redirect:null
    }
    render() {
        if(!Cookies.get('adtoken'))
        {
            this.setState({redirect:'/admin'})
        }
        if(this.state.redirect)
        {
            return <Redirect to="admin"/>
        }
        return (
            <>
            <body class="fixed-navbar">
                <div class="page-wrapper">
                <Menubar/>
                    <div class="content-wrapper">
                        <div class="page-content fade-in-up">
                         Manage Notification
                         </div>
                       <Footer/>
                    </div>
                </div>
                <Setting_Menu/>
            </body>
            </>
        )
    }
}
