import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.comparePassword = async function(userpassword: string): Promise<boolean>{
    return await bcrypt.compare(userpassword, this.password);
}

export const User = mongoose.models.User || mongoose.model("User", userSchema);