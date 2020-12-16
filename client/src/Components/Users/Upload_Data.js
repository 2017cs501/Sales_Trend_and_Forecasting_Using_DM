import React, { Component } from 'react';
import styles from '../../css/uploaddata.module.css';
import axios from 'axios';
import {Progress} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import buffering from '../../images/buffering.gif' ;

class Upload_Data extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirect:null,
            selectedFile: null,
            loaded:0,
            uploaded: 0,
            isLoading: true,
            buffering: false
        }
    }
    onClickHandler = () => {   
        this.setState({
            buffering:true
        })
        const form = new FormData();
        form.append("file", this.state.selectedFile);
        axios.post('/api/upload',form, {headers: {token: Cookies.get('token')}}, {
                onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                })
            }, 
        })
        .then(response=>{
            console.log(response)
        }).then(res => { 
            toast.success('upload success')
            this.setState({
                buffering:false
            })
        })
        .catch(err => { 
            toast.error('upload fail')
            this.setState({
                buffering:false
            })
        })
    }
    onChangeHandler = (e)=>{
        this.setState({
            selectedFile: e.target.files[0],
            loaded: 0
          })
    
    }

    // componentDidMount(){
    //     axios.get('/api/upload/view',{headers: {token: Cookies.get('token')}})
    //     .then(response=>{
    //         console.log(response)
    //         this.setState({
    //             uploaded: response.data.uploaded,
    //              isLoading: false
    //         });    
    //     });
    // }
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
    <Menubar/>
 <div class="content-wrapper">
            <div class="page-content fade-in-up">
            <div> 
  <div className={'row'} style={{marginTop:'20px'}}> 
  <div className={'col-2'}></div>
  <div className={'col-8'}>
 <form>
  <div class="card">
  <div class="card-header"> 
  <div className={styles.first_heading}>Upload your data in .csv format</div></div>
  <div class="card-body">
      <div className="custom-file">
        <input type="file" name="file" onChange={()=>this.onChangeHandler} accept=".csv" required/>
        <div className="form-group mt-2">
        <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
        </div>
      </div>
  </div>
  <div class="card-footer">
  <button type="submit" className={'btn btn-primary btn-lg'} onClick={this.onClickHandler}>Upload Data </button>
  {this.state.buffering?  
  <img className={styles.loader} src={buffering} alt=""/>:null
  }
   { this.state.uploaded == true &&
                    <div className="alert alert-success mt-4" role="alert">
                        We have stored your data
                    </div>}
  </div>
  </div>
  </form>

  </div>
  <div className={'col-2'}></div>
  </div>

  <div className={'row'} style={{marginTop:'30px'}}>
  <div className={'col-1'}></div>
  <div className={'col-10'}>
  <ul class="list-group">

  <li class="list-group-item list-group-item-info">
  <b style={{fontSize:'18px'}}>What should be include in data?</b>
  </li>
  <li class="list-group-item list-group-item-primary">
    We need certain columns from you in order to apply 
    our algorithms. We require a data file containing atleast
    these following columns.             
  </li>
 
  <li class="list-group-item list-group-item-info" style={{marginTop:'10px'}}>
  <b style={{fontSize:'18px'}}>Why do I need to Upload my Data? </b>
  </li>
  <li class="list-group-item list-group-item-primary">
  In order to examine and make predictions about your 
                        store, we need data containing certain columns mentioned 
                        above. With our Automated Analyzing System, we show you 
                        results based on the data you provide here.             
  </li>


  <li class="list-group-item list-group-item-info" style={{marginTop:'10px'}}>
  <b style={{fontSize:'18px'}}>Data Privacy</b>
  </li>
  <li class="list-group-item list-group-item-primary">
  Our Security Policy strictly adhere us NOT to share your data with anyone.             
  </li>
</ul> 
<div className={'col-1'}></div>                   
</div>
</div>
 </div>
<Footer/>
</div>
</div>
<Setting_Menu/>
</div>
</body>
    );
  };
}
export default Upload_Data;