const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const path=require("path");
const signupDoctor=require("./mongodb");
const signupNurse=require("./mongodb");
const signupPatient=require("./mongodb");
const medicalFile=require("./mongodb");
//  const jsdom=require("jsdom");
//  const { JSDOM } = jsdom;
// const templatePath=path.join(__dirname,"../views");
var arr=[];
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
    
    app.get("/profile",async function(req,res){
            let check1,check2,check3;
            var pateints;
            let Num=1;
            check1 = await signupDoctor.signUpDoctor.findOne({ username:arr[0], password: arr[1]});
            check2 = await signupNurse.signupNurse.findOne({ username: arr[0], password: arr[1]});
            check3 = await signupPatient.signupPatient.findOne({ username: arr[0], password: arr[1] });
            patients=await signupPatient.signupPatient.find();
            // If a matching document was found, render the "home" page
            if (check1!=null && check2===null &&check3===null) {
                res.render("profile",{Pname:check1.name,Usr:check1.username,Pid:check1._id,Bday:check1.birth,Vcode:check1.code,Num:Num});
            }else if(check1===null && check2!=null &&check3===null){
                res.render("profile",{Pname:check2.name,Usr:check2.username,Pid:check2._id,Bday:check2.birth,Vcode:check2.code,Num:Num});
            }else if(check1===null && check2===null &&check3!=null){
                filesM=await medicalFile.medicalFile.find({id:check3._id});
                res.render("profile",{Pname:check3.name,Usr:check3.username,Pid:check3._id,Bday:check3.birth,Vcode:check3.code,Num:Num});
                console.log(filesM);
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
        const user = await signupDoctor.signUpDoctor.findOne({username:req.body.userName});
        if (user){
            user.password=req.body.password;
            user.save();
            res.render("login");
        }else{
            res.send("invalid username");
        }
    }else if(req.body.code === "8756"){
        const user = await signupNurse.signupNurse.findOne({username:req.body.userName});
        if (user){
            user.password=req.body.password;
            user.save();
            res.render("login");
        }else{
            res.send("invalid username");
        }
    }else if(req.body.code === "9856"){
        const user = await signupPatient.signupPatient.findOne({username:req.body.userName});
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

app.listen(3824, function() {
    console.log("Server started on port 3824");
});