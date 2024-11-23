import mongoose from "mongoose"


const profileSchema = mongoose.Schema({
    userId : {type : String , ref: 'usersofbharat'},
    userName : String,
    userEmail : {type: String, unique: true}

})
const Profile = new mongoose.model("profile",profileSchema)


export default Profile;
