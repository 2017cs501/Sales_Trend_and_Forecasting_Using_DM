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
      var user_ID=data._id
      let options = { 
      mode: 'text', 
      // pythonPath:'F:\\Anaconda_Installation\\python.exe',
      // pythonPath:'c:\\users\\haier\\appdata\\local\\programs\\python\\python38\\python.exe',
      pythonOptions: ['-u'], 
      scriptPath: 'python_scripts',
      args: [user_ID] // sys.argv[1] 
      }; 
      PythonShell.run('LTValue.py', options, (err, data)=>{ 
          if (err)
          {
            res.send({data:'Some Errors in Running this Prediction, Try Again!'})
            console.log(err)
          }  
          if(data){
            res.send({data:data[0],file:`http://localhost:5000/excel_files/${user_ID}/LTValue.csv`})
            console.log(data.toString())
          }
      }); 
    }

  })
})
  

module.exports=app