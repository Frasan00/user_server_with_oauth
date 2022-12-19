import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    },
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;