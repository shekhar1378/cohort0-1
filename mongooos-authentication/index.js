const express = require("express");
const zod = require("zod");
const mongoose = require("mongoose"); 
const app = express();
const port = 3000;

app.use(express.json())
// Connect to MongoDB
mongoose.connect("mongodb+srv://mauryashekhar13:EwHhh5F4sNhxZGzp@admin.l7o1hhz.mongodb.net/")

const User = mongoose.model("users", {name:String, email:String, password:String, phone:String})

const UserSchema = zod.object({
    name:zod.string().min(3),
    email:zod.string().email(),
    password: zod.string().min(8),
    // confirmPassword: zod.string().equals(zod.password("password")),
    phone: zod.string().min(10).max(10)
})
const validateInput=(obj)=>{
    return UserSchema.safeParse(obj);
}

app.post("/signup", (req, res)=> {
    const response = validateInput(req.body);

    if(!response.success){
        return res.json({
            msg:"Invalid inputs"
        })
    }
    const {name, email, password, phone}= req.body;
    const userExists = User.findOne({email: email})
    if(!userExists){
        res.json({
            msg:"Email already exists"
        })
    }

    const user = new User({
        name: name,
        email:email,
        password: password,
        phone: phone
    })
    user.save();

    res.json({
        msg:"User registered successfully"
    })
})  


app.listen(port)