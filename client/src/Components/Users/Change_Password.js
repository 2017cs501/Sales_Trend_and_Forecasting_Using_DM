import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

export default class Change_Password extends Component {
    constructor(props){
    super(props);
    this.state={
        id:'',
        password:'',
        conf_password:'',
        errors:'',
        redirect:null
        }
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidMount(){
     //console.log(this.props.match.params.id)
    }
    
    formSubmit=(e)=>{
    e.preventDefault();
    if(this.state.password!=this.state.conf_password)
    {
        this.setState({errors:'Passwords not matched'})
    }
    else
    {
    // axios.post('/update_reset_password',this.state)
    // .then(responce=>
    // {
    // alert(responce.data)
    // })
      }
    }

    render() {
        if(this.state.redirect)
        {
            return <Redirect to={this.state.redirect}/>
        }
    return (
    <div>
      <Navbar/>
      <section style={{marginTop:'-50px',backgroundColor:'#37517e'}}>
    <div class="registration-form">
        <form onSubmit={(e)=>this.formSubmit(e)}>
        <div class="form-group" style={{textAlign:'center',color:'#37517E',paddingBottom:'20px'}}>
            <h2>Reset Password</h2>
            </div>
            <div class="form-group">
                <input type="password" class="form-control item" name="password" placeholder="Password" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <input type="password" class="form-control item" name="conf_password" placeholder="Repaet Password" onChange={(e)=>this.onInputChange(e)} required/>
            </div>      
            {
            this.state.errors? 
            <center><strong style={{color:'red'}}>{this.state.errors} ! Try again </strong>   
            </center>:null
            }
            <div class="form-group">
            <button class="btn btn-block create-account">Reset Now</button>
            </div>
           <p className="text-center"> Not have an account yet? <Link to="/signup">Create an account</Link></p>
        </form>
    </div>
    </section>
</div>
    )
    }
}
