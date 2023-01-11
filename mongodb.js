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
    },
    code:{
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
    },
    code:{
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
    },
    code:{
        type:String,
        require:true
    }
});

const MedicalFileSchema=new mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    BloodType:{
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

const signupDoctor=new mongoose.model("SignUpDoctor",SignupDoctorSchema);
const signupNurse=new mongoose.model("SignUpNurse",SignupNurserSchema);
const signupPatient=new mongoose.model("SignUpPatient",SignupPatientSchema);
const medicalFile=new mongoose.model("MedicalFile",MedicalFileSchema);
module.exports={
   signUpDoctor: signupDoctor,
    signupNurse: signupNurse,
    signupPatient:signupPatient,
    medicalFile:medicalFile
}


