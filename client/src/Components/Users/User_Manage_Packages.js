import React, { Component } from 'react'
import Menubar from './Menubar'
import Footer from './Footer'
import axios from 'axios'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
export default class User_Manage_Packages extends Component {
    state={
        redirect:null,
        plans:[],
        related_data:[],
        all_actions_data:[],
        category:null,
    }
    getdata()
    {
        axios.get('/all_actions_info')
        .then(responce=>{
            console.log(responce.data)
            this.setState({all_actions_data:responce.data});
        })
    }
    getPlansrelatedAction=(pname)=>
    {
        axios.get(`/get_all_plans_related_data/${pname}`)
        .then(res=>{
          console.log(res.data)
          this.setState({pname:res.data})
        })
    }
    get_user_plan_info()
    {
        axios.get('/profile_info',{headers:{token:Cookies.get('token')}})
        .then(responce=>{
            console.log(responce.data.profile);
            this.setState({category:responce.data.profile.category})
        })
    }
    componentDidMount()
    {
        axios.get('/get_all_plans')
        .then(res=>{
            console.log(res.data)
            this.setState({plans:res.data})
        })
        this.getdata()
        this.get_user_plan_info()
    }
    render() {
        if(!Cookies.get('token'))
        {
            this.setState({redirect:'/login'})
        }
        if(this.state.redirect)
        {
            return <Redirect to="login"/>
        }
    return (
    <>
    <body class="fixed-navbar">
    <div class="page-wrapper">
    <Menubar/>
    <div class="content-wrapper">
        <div class="page-content fade-in-up">
        <section id="pricing" class="pricing">
      <div class="container" data-aos="fade-up">
          <h1 className="text-center">All Packages Information {this.state.category}</h1>
        <p className="text-center">Every package comes with different actions, which are detailed below</p>
        <div class="row">
          {this.state.plans.map((data,index)=>(
          <>
          <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div class="box">
          <h3>{data.pname}</h3>
              <h4><sup>$</sup>{data.pprice}<span>per month</span></h4>
              <ul>

              {
  this.state.all_actions_data.filter(data1=>data1.aplan==data.pname
  ).map(data2 => (
    <li><i class="bx bx-check"></i>{data2.aname}</li>
   ))
  }                         
{
data.pname=="Standard"?this.state.all_actions_data.filter(data1 => data1.aplan!='Premium'&&data1.aplan!='Standard').map(data2 => (
  <li><i class="bx bx-check"></i> <span>{data2.aname}</span></li>
)):null
}
{
data.pname=="Premium"?this.state.all_actions_data.filter(data1 => data1.aplan!='Premium').map(data2 => (
  <li><i class="bx bx-check"></i> <span>{data2.aname}</span></li>
)):null
}
</ul>

     {
     this.state.category==data.pname?<button class="btn btn-disabled disabled btn-primary">Your Plan</button>:
        <a href="/manage_actions" class="buy-btn">Upgrade Now</a>
     }

        </div>
       </div>
      </>   
    ))}
        </div>
      </div>
    </section>
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