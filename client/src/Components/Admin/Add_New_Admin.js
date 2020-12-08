import React, { Component } from 'react'
export default class Add_New_Admin extends Component {
    state={
        uname:'',
        email:'',
        phone:'',
        password:''
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    formSubmit=(e)=>{
        e.preventDefault();
        if(this.state.password==this.state.confirm_password)
       {
        fetch('/admin_registration',{
            method:'post',
            body:JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json'
              }
        })
        alert('Customer Register Successfully!')
        this.reset_form();      
    }
    else
    {
          alert("Passwords Not Matched")
    }
    }
    reset_form=()=>{
        this.setState({
        uname:'',
        email:'',
        phone:'',
        password:'',
        confirm_password:''
        })
    }
render() {
return (
<div>
<section style={{marginTop:'-50px',backgroundColor:'#37517e'}}>
    <div class="registration-form">
        <form onSubmit={this.formSubmit}>
        <div class="form-group" style={{textAlign:'center',color:'#37517E',paddingBottom:'20px'}}>
            <h2>Admin Registration Form</h2>
            </div>
            <div class="form-group">
                <input type="text" value={this.state.uname} pattern='^[a-zA-Z1-9]+$' class="form-control item" name="uname" minLength="6" title="Username Name Should be at least six characters long and not contain ant space" placeholder="User Name" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <input type="email" value={this.state.email} class="form-control item" name="email" placeholder="Email" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <input type="text" value={this.state.phone} pattern='^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$' title="Phone Number should be +92-349-7462877 in this format" class="form-control item" name="phone" placeholder="Phone Number" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <input type="password" value={this.state.password} minlength="8" title="Minimum Length should be 8" class="form-control item" id="exampleInputPassword1" name="password" placeholder="Password" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <input type="password" value={this.state.confirm_password} class="form-control item" id="exampleConfirmPassword1" data-match="password"
              data-match-field="#exampleInputPassword1" name="confirm_password" placeholder="Repeat Password" onChange={(e)=>this.onInputChange(e)} required/>
            </div>    
            <div class="form-group">
            <button class="btn btn-block create-account">Create Account</button>
               </div>    
     </form>
    </div>
    </section>
            </div>
        )
    }
}
