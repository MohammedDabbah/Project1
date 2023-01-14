const mongoose =require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://m7mddacca:m7md123@cluster0.4hynvpk.mongodb.net/test")
// mongoose.connect("mongodb://localhost:27017/HospitalSystem")
.then(function(){
    console.log("mongodb connected")
})
.catch(function(){
    console.log("faild to connect");
})

const SignupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    _id:{
        type:String,
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
    },
    code:{
        type:String,
        require:true
    }
});

const MedicalFileSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    DiseaseDiagnosis:{
        type:String,
        required:true
    },
    NextAppointmentDate:{
        type:String,
        required:true
    },
    MedicationsAndDosages:{
        type:String,
        required:true
    }
});

const signUp=new mongoose.model("SignUp",SignupSchema);
const medicalFile=new mongoose.model("MedicalFile",MedicalFileSchema);
module.exports={
    signUp,
    medicalFile
}

