var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
app.use(bodyPraser.jason())
app.use(express.static('public'))
app.use(bodyParesr.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017//mydb',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));
app.post("/sign_up",(req,res)=>{
    var name= req.body.name;
    var id = req.body.id;
    var birth = req.body.birth;
    var username= req.body.username;
    var password = req.body.password;
    var reqpassword = req.body.reqpassword;
    var check = req.body.check;

     var data ={
        "name": name,
        "username":username,
        "birh":birth,
        "ID":id,
        "password":password,
        "reqpassword":reqpassword
     }
     db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
     });
    return res.redirect('signup_success.html')

})

app.get("/",(req,res)=>{
  res.set({
    "Allow-access-Alow-Origin": '*'
  }) 
  return res.redirect('index.html')
}).listen(3000);

console.log("Listening on PORTt 3000");