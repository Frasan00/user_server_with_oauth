import User from "../database/User";
import Session from "../database/Session";
import bcrypt from "bcryptjs";
import checkIfExists from "../utilities/checkIfExists";
import tokenGenerator from "../utilities/tokenGenerator";
import { Request, Response } from "express";


const register = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const checkUser = await checkIfExists.checkUser(userName);
    if (checkUser) return res.status(400).send("User already registed");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
        userName: userName,
        password: hashedPassword
    });

    const saveUser = newUser.save();
    res.send("User registed!");
};


const login = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const checkUser = await checkIfExists.checkSession(userName);
    if (checkUser) return res.status(400).send("User already logged")

    // password check
    const user = await User.findOne({userName: userName});
    if(!user || !user.password) return res.status(404).send("User does not exist");
    const passwordComparison =  await bcrypt.compare(password, user.password);
    if (passwordComparison === false) return res.send("Passwords missmatch");

    // session generation
    const token = tokenGenerator(userName);
    if (token === -1) return res.status(400).send("Secret key not present for token generation");
    const session = new Session({
        userName: userName,
        token: token
    });
    const saveSession = await session.save();
    res.send("User logged");
};

const logout = async (req: Request, res: Response) => {
    const userName: string = req.body.userName;
    if(!userName) return res.status(400).send("User not logged in");

    const sessionToDelete = await Session.findOneAndDelete({userName: userName});
    if(!sessionToDelete) return res.status(400).send("User not logged in");
    return res.send("User logged out");
};

export default { register, login, logout };