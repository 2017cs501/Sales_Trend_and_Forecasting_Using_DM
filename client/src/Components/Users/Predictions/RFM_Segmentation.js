import React, { Component } from 'react';
import styles from '../../../css/uploaddata.module.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import Menubar from '../Menubar'
import Footer from '../Footer'
import Setting_Menu from '../Setting_Menu'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import buffering from '../../../images/buffering.gif';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';

class RFM_Segmentation extends Component {
  constructor(props){
    super(props)
    this.state = {
        uploaded: 0,
        buffering: false,
        file:null,
        result:''
    }
}
getdata(){
  axios.get('/prediction/rfm',{headers: {token: Cookies.get('token')}})
    .then(response=>{
        console.log(response)
        this.setState({
        result:response.data.data,
        file:response.data.file,
        buffering:false    
        });    
    });
}
componentDidMount(){
  this.setState({buffering:true})
    axios.get('/check_is_upload',{headers: {token: Cookies.get('token')}})
    .then(response=>{
        console.log(response)
        this.setState({
            uploaded: response.data.data,
            file:response.data.file
        });    
    });
    this.getdata()
}
  render() 
  {
    if(!Cookies.get('token'))
    {
        this.setState({redirect:'/login'})
    }
    if(this.state.redirect)
    {
        return <Redirect to="/login"/>
    }
    return(
  <body class="fixed-navbar">
    <div class="page-wrapper">
    <Menubar name="RFM"/>
  <div class="content-wrapper">
  <div class="page-content fade-in-up">
        <h1 style={{textAlign:'center'}}><u>RFM(Recency, Frequency, Monetary) Segmentation</u></h1>
        {this.state.uploaded?
        <>
        {
        this.state.buffering?
        <>  
        <div style={{textAlign:'center',marginTop:40}}>
        <h3 class="text-danger" style={{textAlign:'center',marginTop:20}}>RFM (Recency, Frequency, Monetary) Segmentation Running Please Wait..... </h3>
        <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center'}} src={buffering} alt="Buffering"/>
        </div>
        </>
        :null
        }
        </>
        :
        <>
        <div style={{textAlign:'center',marginTop:50,marginBottom:30}}>
        <hr></hr>
        <h3 style={{marginTop:30}} class="text-center text-danger">Please upload your data first to preview data</h3>
        <a class="text-center btn btn-primary" href="/upload_data">Upload Data Now</a>
        </div>
        <hr></hr>
        </>
        }
      {this.state.result?<>
        <div style={{textAlign:'center'}}>
      <h2  class={this.state.file?"text-success":"text-danger"} style={{textAlign:'center',marginTop:40}}>
        {this.state.result} !</h2>
        {this.state.file? <a href={this.state.file} class={'btn btn-primary btn-sm'}>Download Predcted File</a>:''}
      </div>
      </>:''}
<Footer/>
</div>
</div>
<Setting_Menu/>
</div>
</body>
    );
  };
}

export default RFM_Segmentation;