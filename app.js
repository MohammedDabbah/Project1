const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const assert = require('assert');
// const path=require("path");
const signUp=require("./mongodb");
const medicalFile=require("./mongodb");
// const { deepEqual } = require("assert");
//  const jsdom=require("jsdom");
//  const { JSDOM } = jsdom;
// const templatePath=path.join(__dirname,"../views");
var arr=[];
let check1;
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.set('view engine', 'ejs');
// app.set("views",templatePath);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended:false}));

app.get("/",function(req,res){
    res.render("home");
});

app.get("/signupDoctor",function(req,res){
    res.render("signupDoctor");
});

app.get("/signupNurse",function(req,res){
    res.render("signupNurse");
});

app.get("/signupPatient",function(req,res){
    res.render("signupPatient");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.post("/signupDoctor",async  function(req,res){
    check1=await signUp.signUp.findOne({username:req.body.userName});
    if(check1){
        res.send("this username are used");
    }else{
    const data={
        name:req.body.name,
        _id:req.body.id,
        birth:req.body.birthBox,
        gender:req.body.flexRadioDefault,
        username:req.body.userName,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        code:req.body.code
    }
    if(data.password!=data.confirmPassword){
        res.send("Passwords unmatch!.");
    } else if(data.code!="6578"){
        res.send("invalid code!");
    } 
    else{
        await signUp.signUp.insertMany([data]);
        res.render("home");
    }
}
});
app.post("/signupNurse",async  function(req,res){
    check1=await signUp.signUp.findOne({username:req.body.userName});
    if(check1){
        res.send("this username are used");
    }else{
    const data={
        name:req.body.name,
        _id:req.body.id,
        birth:req.body.birthBox,
        gender:req.body.flexRadioDefault,
        username:req.body.userName,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        code:req.body.code
    }

    if(data.password!=data.confirmPassword){
        res.send("Passwords unmatch!.");
    } else if(data.code!="8756"){
        res.send("invalid code!");
    } 
    else{
        await signUp.signUp.insertMany([data]);
        res.render("home");
    }
}
});
    app.post("/signupPatient",async  function(req,res){
        check1=await signUp.signUp.findOne({username:req.body.userName});
        if(check1){
            res.send("this username are used");
        }else{
        const data={
            name:req.body.name,
            _id:req.body.id,
            birth:req.body.birthBox,
            gender:req.body.flexRadioDefault,
            username:req.body.userName,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword,
            code:req.body.code
        } 
        if(data.password!=data.confirmPassword){
            res.send("Passwords unmatch!.");
        } else if(data.code!="9856"){
            res.send("invalid code!");
        } 
        else{
            await signUp.signUp.insertMany([data]);
            res.render("home");
        }
    }
});
    
    app.get("/profile",async function(req,res){
            let check1;
            var pateints;
            let Num=1;
            check1 = await signUp.signUp.findOne({ username:arr[0], password: arr[1]});
            patients=await signUp.signUp.find({code:"9856"});
            // If a matching document was found, render the "home" page
            if(check1){
                if(check1.code!="9856"){
                    res.render("profile",{Pname:check1.name,Usr:check1.username,Pid:check1._id,Bday:check1.birth,Vcode:check1.code,Num:Num});
                }else{
                    filesM=await medicalFile.medicalFile.find({id:check1._id})
                    res.render("profile",{Pname:check1.name,Usr:check1.username,Pid:check1._id,Bday:check1.birth,Vcode:check1.code,Num:Num}); 
                }
            }else{
                res.send("Wrong username/password");
                console.log(arr);
            }
});

app.post("/login",function(req,res){
    arr=[];
    arr.push(req.body.userName);
    arr.push(req.body.password);
    console.log(arr[0]);
    console.log(arr[1]);
    res.redirect("/profile")
})

app.post("/",async function(req,res){
    const data={
        id:req.body.userid,
        DiseaseDiagnosis:req.body.DiseaseDiagnosis,
        NextAppointmentDate:req.body.appointment,
        MedicationsAndDosages:req.body.medication
    }
    await medicalFile.medicalFile.insertMany([data]);
    res.redirect("/profile");

})

    app.get("/forgetpassword",function(req,res){
        res.render("forgetpassword");
    })

app.post("/forgetpassword", async function(req, res) {
    if (req.body.code === "6578") {
        const user = await signUp.signUp.findOne({username:req.body.userName});
        if (user){
            user.password=req.body.password;
            user.confirmPassword=user.password;
            user.save();
            res.render("login");
        }else{
            res.send("invalid username");
        }
    }else if(req.body.code === "8756"){
        const user = await signUp.signUp.findOne({username:req.body.userName});
        if (user){
            user.password=req.body.password;
            user.save();
            res.render("login");
        }else{
            res.send("invalid username");
        }
    }else if(req.body.code === "9856"){
        const user = await signUp.signUp.findOne({username:req.body.userName});
        if (user){
            user.password=req.body.password;
            user.save();
            res.render("login");
        }else{
            res.send("invalid username");
        }
    }else{
        res.send("invaalid user");
    }
});
app.get("/changepassword",function(req,res){
    res.render("changepassword");
});

app.post("/changepassword", async function(req,res){
    if(req.body.currentPassword!=req.body.newPassword){
        check1 = await signUp.signUp.findOne({username:req.body.userName, password:req.body.currentPassword});
        if(check1){
             check1.password=req.body.newPassword;
             check1.confirmPassword=req.body.newPassword;
             check1.save();
             res.render("login");
        }else{
            res.send("Wrong username/password");
        }
    }else{
        res.send("already have this password");
    }
});

app.get("/changeusername",function(req,res){
    res.render("changeusername");
});

app.post("/changeusername",async function(req,res){
    check1=await signUp.signUp.findOne({_id:req.body.userId,code:req.body.code,password:req.body.password});
    if(check1.username!=req.body.newUsername){
        let check2= await signUp.signUp.findOne({username:req.body.newUsername});
        if(check1){
            if(!check2){
                check1.username=req.body.newUsername;
                check1.save();
                res.render("login");
            }else{
                res.send("this username are used");
            }
        }else{
            res.send("some information are wrong");
        }
    }else{
        res.send("already have this username");
    }
    

});

app.listen(3824, function() {
    console.log("Server started on port 3824");
});
