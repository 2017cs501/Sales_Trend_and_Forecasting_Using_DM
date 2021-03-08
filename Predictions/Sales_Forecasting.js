const express=require('express')
const app=express()
const {PythonShell} =require('python-shell');
var jwt=require('jsonwebtoken')
const xlsx=require('xlsx')
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
      PythonShell.run('Sales_Forecasting.py', options, (err, data)=>{ 
          if (err)
          {
            res.send({data:'Some Errors in Running this Prediction, Try Again!'})
            console.log(err)
          }  
          if(data){
            res.send({data1:data[0],data2:data[1],file:`http://localhost:5000/excel_files/${user_ID}/trend.csv`})
            console.log(data.toString())
          }
      }); 
    }

  })
})
  
app.get('/plot-graph',(req, res)=> {
  var token=req.headers.token
  var decoded=jwt.verify(token, 'jwtPrivateKey')
  UserRegistrationModel.findOne({_id:decoded._id})
  .then(data=>{
  if(data)
   {
    const userId=data._id
    const w=xlsx.readFile(`./excel_files/${userId}/ARIMA.xlsx`)
    const s=w.SheetNames;
    let data=xlsx.utils.sheet_to_json(w.Sheets[s[0]])
    const chartData={
        labels:[],
        datasets:[]
    }
    data.map(n=>{
        chartData.labels.push(n.invoicedate)
        chartData.datasets.push(n.unitprice)
    })
    res.send({
        val:chartData
    });
  }
})
});

module.exports=app