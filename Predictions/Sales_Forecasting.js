const express=require('express')
const app=express()
const {PythonShell} =require('python-shell');
var jwt=require('jsonwebtoken')
var UserRegistrationModel=require('../models/UserRegistration')
app.get('/',(req,res)=>{
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
    var package_name = 'numpy'
    var user_ID=data._id
    let options = { 
      mode: 'text', 
      pythonOptions: ['-u'], 
      scriptPath: 'python_scripts',
      args: [user_ID] // sys.argv[1] 
      }; 
      PythonShell.run('RFM_Value.py', options, (err, data)=>{ 
          if (err) throw err; 
          res.send({data:data[0],file:'http://localhost:5000/excel_files/6002f2a993b9f11d5876da66/custSeg.csv'})
          console.log(data.toString())
      }); 
    }

  })
})
  

module.exports=app