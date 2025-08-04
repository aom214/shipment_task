import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"]
    }
})


userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        const salt = parseInt(process.env.SALT)
        const pass = this.password.trim()
        const hashed_pass=await bcrypt.hash(pass,salt)
        this.password = hashed_pass
    }
})


userSchema.methods.comparepassword = async function(password){
    const is_true = await bcrypt.compare(password,this.password)
    return is_true
}

const usermodel = mongoose.models("User",userSchema)