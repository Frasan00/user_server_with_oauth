import Session from "../database/Session";
import User from "../database/User";

async function checkSession (userName: string){
    const check = await Session.findOne({userName: userName});
    return check;
};

async function checkUser (userName: string){
    const check = await User.findOne({userName: userName});
    return check;
};

export default {checkSession, checkUser};