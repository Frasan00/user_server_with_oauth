import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
});

const User = mongoose.model("User", userSchema);
export default userSchema;