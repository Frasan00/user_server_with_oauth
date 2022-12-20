import Session from "../database/Session";
import User from "../database/User";

function checkSession (userName: string){
    const check = Session.findOne({userName: userName});
    return check;
};

function checkUser (userName: string){
    const check = User.findOne({userName: userName});
    return check;
};

export default {checkSession, checkUser};