const express = require('express');
const app = express();
const mongoose = require("mongoose");
const {mongourl} = require('./config/keys');
var jwt=require('jsonwebtoken')
mongoose.connect(mongourl,{useNewUrlParser:true,useUnifiedTopology: true});

//Models Imports

var UserRegistrationModel=require('./models/UserRegistration')
var AdminRegistration=require('./models/AdminRegistration')
var Plan_Model=require('./models/Add_Plan')
var Action_Model=require('./models/Add_Action')
//End Model Imports

module.exports = (app)=>{
app.get('/',(req,res)=>{
        res.render('home')
})
app.post('/registration',(req,res)=>{
    var UserData=new UserRegistrationModel({
        fname:req.body.fname,
        lname:req.body.lname,
        uname:req.body.uname,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        category:'Free'
    })
    UserData.save((err,res)=>{
        if(err) throw err;
        console.log("Successfully !")
    })
})
app.get('/get_admin_info',(req,res)=>{
    var token=req.headers.token;
    var decoded=jwt.verify(token,'jwtPrivateKey')
    AdminRegistration.findOne({_id:decoded._id})
    .then(data=>{
        res.send({
            data:data
        })
    })
})
app.get('/profile_info',(req,res)=>{
    var token=req.headers.token;
    var decoded = jwt.verify(token, 'jwtPrivateKey');
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
        res.send({
            profile:data
        })
    })
})
app.post('/update_plan',(req,res)=>{
    Plan_Model.updateOne({_id:req.body.id},{$set:{pname:req.body.ppname,pprice:req.body.ppprice}})
    .then(data=>{
        res.send({
            data:data
        })
    })
})
app.post('/update_customer',(req,res)=>{
    UserRegistrationModel.updateOne({_id:req.body.id},{$set:{fname:req.body.ufname,lname:req.body.ulname,uname:req.body.uuname,email:req.body.uemail,phone:req.body.uphone,password:req.body.upassword}})
    .then(data=>{
        res.send({
            data:data
        })
    })
})
app.post('/update_action',(req,res)=>{
    Action_Model.updateOne({_id:req.body.id},{$set:{aname:req.body.aaname,aplan:req.body.aaplan}})
    .then(data=>{
        res.send({
            data:data
        })
    })
})
app.post('/update_customer',(req,res)=>{
    var token=req.headers.token;
    var decoded = jwt.verify(token, 'jwtPrivateKey');
    UserRegistrationModel.updateOne({_id:decoded._id},{$set:{fname:req.body.fname,lname:req.body.lname,uname:req.body.uname,email:req.body.email,phone:req.body.phone,password:req.body.password}})
    .then(data=>{
        res.send({
            data:data
        })
    })
})

app.post('/update_admin',(req,res)=>{
    var token=req.headers.token;
    var decoded = jwt.verify(token, 'jwtPrivateKey');
    AdminRegistration.updateOne({_id:decoded._id},{$set:{uname:req.body.uname,email:req.body.email,phone:req.body.phone,password:req.body.password}})
    .then(data=>{
        res.send({
            data:data
        })
    })
})

app.get('/get-data',(req,res)=>{
     UsersModel.find({})
     .then(data=>{
         res.send(data)
     })
 })

 app.get('/get_all_plans',(req,res)=>{
     Plan_Model.find({})
     .then(data=>{
         res.send(data);
     })
 })

app.post('/update_plan',(req,res)=>{
    Plan_Model.updateOne({_id:req.body.id},{$set:{pname:req.body.ppname,pprice:req.body.ppprice}})
})

app.post('/add_plan',(req,res)=>{
    var plan_data=new Plan_Model({
        pname:req.body.pname,
        pprice:req.body.pprice
    })
    plan_data.save((err,res)=>{
        if(err) throw err;
    })
})

app.post('/add_action',(req,res)=>{
    var action_data=new Action_Model({
        aname:req.body.aname,
        aplan:req.body.aplan
    })
    action_data.save((err,res)=>{
        if(err) throw err;
    })
})


app.post('/admin_registration',(req,res)=>{
    var admin_data=new AdminRegistration({
        uname:req.body.uname,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    })
    admin_data.save((err,res)=>{
        if(err) throw err;    
    })
})
app.post('/delete_customer/:id',(req,res)=>{
    console.log(req.params.id)
    UserRegistrationModel.deleteOne({_id:req.params.id})
    .then(res1=>{
        res.send({
            data:"Customer Deleted Successfully ! "
        })
    }) 
})

app.get('/get_all_plans_related_data/:id',(req,res)=>{
    var pname=req.params.id
    console.log(pname)
    Action_Model.find({aplan:pname})
    .then(data=>{
        res.send(data)
    })
})

app.post('/delete_plan/:id',(req,res)=>{
    console.log(req.params.id)
    Plan_Model.deleteOne({_id:req.params.id})
    .then(res1=>{
        res.send({
            data:"Plan Deleted Successfully ! "
        })
    }) 
})

app.post('/delete_action/:id',(req,res)=>{
    console.log(req.params.id)
    Action_Model.deleteOne({_id:req.params.id})
    .then(res1=>{
        res.send({
            data:"Action Deleted Successfully ! "
        })
    }) 
})

app.get('/all_plans_info',(req,res)=>{
    Plan_Model.find({})
     .then(data=>{
         res.send(data);
     })
 })
 

app.get('/all_custumers_info',(req,res)=>{
   UserRegistrationModel.find({})
    .then(data=>{
        res.send(data);
    })
})
app.get('/get_plan_data/:id',(req,res)=>{
    Plan_Model.findOne({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
})
app.get('/get_count_data',(req,res)=>{
    Action_Model.countDocuments({})
    .then(data=>{
    Plan_Model.countDocuments({})
    .then(data1=>{
    UserRegistrationModel.countDocuments({})
    .then(data2=>{
        res.send({atotal:data,ptotal:data1,utotal:data2})
    })
    })    
    })
})
app.get('/get_customer_data/:id',(req,res)=>{
    UserRegistrationModel.findOne({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
})
app.get('/get_action_data/:id',(req,res)=>{
    Action_Model.findOne({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
})
app.get('/all_actions_info',(req,res)=>{
    Action_Model.find({})
     .then(data=>{
         res.send(data);
     })
 })

app.post('/admin_login',(req,res)=>{
    var user=new AdminRegistration({
        email:req.body.email,
        password:req.body.password
    })
    AdminRegistration.findOne({email:user.email,password:user.password})
    .then(data=>{
        var errors;
        var token;
        if(!data)
        {
            errors="Invalid E-Mail or Password";
        }
        else
        {
            token=jwt.sign({ _id:data._id },'jwtPrivateKey');
        }
        res.send({
              error:errors,
              tokens:token
        })
    })
    })
app.post('/login',(req,res)=>{
     var user=new UserRegistrationModel({
         email:req.body.email,
         password:req.body.password
     })
    UserRegistrationModel.findOne({email:user.email,password:user.password})
     .then(data=>{
        var errors;
        var token;
        if(!data)
        {
            errors="Invalid E-Mail or Password";
        }
        else
        {
            token=jwt.sign({ _id:data._id },'jwtPrivateKey');
        }
        res.send({
            error:errors,
            tokens:token
        })
     })
    
 })
 app.post('/sent-data',(req,res)=>{
     var usersData=new UsersModel({
         uname:req.body.uname,
         email:req.body.email,
         password:req.body.password
     })
     usersData.save((err,res)=>{
         if(err) throw err
         console.log('Successfully !')
     })
    res.send(JSON.stringify(req.body))
})
}