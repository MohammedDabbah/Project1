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
        await signupDoctor.signUpDoctor.insertMany([data]);
        res.render("home");
    }
});
app.post("/signupNurse",async  function(req,res){
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
        await signupNurse.signupNurse.insertMany([data]);
        res.render("home");
    }
});
    app.post("/signupPatient",async  function(req,res){
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
            await signupPatient.signupPatient.insertMany([data]);
            res.render("home");
        }
    });

    app.post("/login",async function(req,res){
            let check1,check2,check3;
            check1 = await signupDoctor.signUpDoctor.findOne({ username: req.body.userName, password: req.body.password });
            check2 = await signupNurse.signupNurse.findOne({ username: req.body.userName, password: req.body.password });
            check3 = await signupPatient.signupPatient.findOne({ username: req.body.userName, password: req.body.password });
            // If a matching document was found, render the "home" page
            if (check1!=null && check2===null &&check3===null) {
                res.render("home");
            }else if(check1===null && check2!=null &&check3===null){
                res.render("home");
            }else if(check1===null && check2===null &&check3!=null){
                res.render("home");
            }else{
                res.send("Wrong username/password");
            }
});

    app.get("/forgetpassword",function(req,res){
        res.render("forgetpassword");
    })

app.post("/forgetpassword", function(req, res) {
    if (req.body.code === "6578") {
        signupDoctor.signUpDoctor.findOne({ username: req.body.userName }, function(err,user) {
            if(!err){
                res.send("invalid username");
            }else{
                user.password = req.body.password;
                user.confirmPassword=req.body.password;
                user.save(function(err){
                    if(err){
                        res.send("Error updating password");
                    }else{
                        res.render("login");
                    }
                });
            }
        });
        }else if(req.body.code === "8756"){
            signupPatient.signupPatient.findOne({username:req.body.userName},function(err,user){
                if(!err){
                    res.send("invalid username");
                }else{
                    user.password = req.body.password;
                    user.confirmPassword=req.body.password;
                    user.save(function(err){
                        if(err){
                            res.send("Error updating password");
                        }else{
                            res.render("login");
                        }
                    })
                }
            });
        } else if(req.body.code === "9856"){
            signupPatient.signupPatient.findOne({username:req.body.userName},function(err,user){
                if(!err){
                    res.send("invalid username");
                }else{
                    user.password = req.body.password;
                    user.confirmPassword=req.body.password;
                    user.save(function(err){
                        if(err){
                            res.send("Error updating password");
                        }else{
                            res.render("login");
                        }
                    })
                }
            });
        }else{
            res.send("wrong validation code !");
        }
});

app.listen(3824, function() {
    console.log("Server started on port 3824");
});