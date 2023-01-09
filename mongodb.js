const mongoose =require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/HospitalSystem")
.then(function(){
    console.log("mongodb connected")
})
.catch(function(){
    console.log("faild to connect");
})

const SignupDoctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    _id:{
        type:Number,
        required:true
    },
    birth:{
        type:String
    },
    gender:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        require:true
    }
});

const SignupNurserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    _id:{
        type:Number,
        required:true
    },
    birth:{
        type:String
    },
    gender:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        require:true
    }
});
const SignupPatientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    _id:{
        type:Number,
        required:true
    },
    birth:{
        type:String
    },
    gender:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        require:true
    }
});

const signupDoctor=new mongoose.model("SignUpDoctor",SignupDoctorSchema);
const signupNurse=new mongoose.model("SignUpNurse",SignupNurserSchema);
const signupPatient=new mongoose.model("SignUpPatient",SignupPatientSchema);
module.exports={
   signUpDoctor: signupDoctor,
    signupNurse: signupNurse,
    signupPatient:signupPatient
}


