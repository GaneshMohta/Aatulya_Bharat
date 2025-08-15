import mongoose from "mongoose"
import bcrypt from "bcrypt"

const authSchema = mongoose.Schema({
    user_id:String,
    userName : String,
    email:{
        type:String,
        required:true
    },
    userRole: {
        type : String,
        enum :['User', 'Bussiness' , 'Blogger']
    },
    image:{
        type: String,
    }
});



const authUser = mongoose.model("usersofbharatOauth",authSchema);

export default authUser;
