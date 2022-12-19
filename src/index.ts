import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import dotenv from "dotenv/config";

const PORT = process.env.PORT;
const app = express();

// connection to database
mongoose.connect("mongodb://localhost:27017/user_database")
.then(() => console.log("Connected to the database"))
.catch((err) => console.log("Couldn't connect to the database"));

app.use(express.json());
app.use("/user", userRoute);

app.get("*", (req, res) => {
    res.send("Resource not available")
});

app.listen(() => console.log("Listening on port "+PORT));

