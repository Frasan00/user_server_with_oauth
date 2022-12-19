import Session from "../database/Session";
import User from "../database/User";

async function checkSession (userName: string){
    const check = await Session.findOne({userName});
    if(!check) return -1
    return 1
};

async function checkUser (userName: string){
    const check = await User.findOne({userName});
    if(!check) return -1
    return 1
};

export default {checkSession, checkUser};