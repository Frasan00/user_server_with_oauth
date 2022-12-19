import User from "../database/User";
import bcrypt from "bcryptjs";
import checkIfExists from "../utilities/checkIfExists";
import tokenGenerator from "../utilities/tokenGenerator";
import Session from "../database/Session";


const register = async (req: any, res: any) => {
    const { userName, password } = req.body();

    if (await checkIfExists.checkSession(userName) == -1){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            userName: userName,
            password: hashedPassword
        });
        const saveUser = newUser.save();
        res.send("User registed!");

    }else return res.status(400).send("User already registed")
};


const login = async (req: any, res: any) => {
    const { userName, password } = req.body();

    if (await checkIfExists.checkSession(userName) == -1){
        // password check
        const user = await User.findOne(userName);
        if(!user || !user.password) return res.send("User does not exist");
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

    }else return res.status(400).send("User already logged")
};

const logout = async (req: any, res: any) => {

};