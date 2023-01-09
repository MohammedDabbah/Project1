const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const path=require("path");
 const signupDoctor=require("./mongodb");
 const signupNurse=require("./mongodb");
 const signupPatient=require("./mongodb");
//  const jsdom=require("jsdom");
//  const { JSDOM } = jsdom;
// const templatePath=path.join(__dirname,"../views");

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
    const data={
        name:req.body.name,
        id:req.body.id,
        birth:req.body.birthBox,
        gender:req.body.flexRadioDefault,
        username:req.body.userName,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    }
    if(data.password===data.confirmPassword){
        await signupDoctor.signUpDoctor.insertMany([data]);
        res.render("home");
    } else{
        res.send("Passwords unmatch!.");
    }
});
app.post("/signupNurse",async  function(req,res){
    const data={
        name:req.body.name,
        id:req.body.id,
        birth:req.body.birthBox,
        gender:req.body.flexRadioDefault,
        username:req.body.userName,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    }

    if(data.password===data.confirmPassword){
        await signupPatient.signupPatient.insertMany([data]);
        res.render("home");
    } else{
        res.send("Passwords unmatch!.");
    }
});
    app.post("/signupPatient",async  function(req,res){
        const data={
            name:req.body.name,
            id:req.body.id,
            birth:req.body.birthBox,
            gender:req.body.flexRadioDefault,
            username:req.body.userName,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword
        } 
         if(data.password===data.confirmPassword){
            await signupPatient.signupPatient.insertMany([data]);
            res.render("home");
        } else{
            res.send("Passwords unmatch!.");
        }
    });

    app.post("/login",async function(req,res){
        try{
            const check= await signupDoctor.signUpDoctor.findOne({username:req.body.userName})
            if(check.password===req.body.password){
                res.render("home");
            }else{
                res.send("wrong password");
            }
        }
        catch{
            res.send("wrong detials");
        }
    });

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });