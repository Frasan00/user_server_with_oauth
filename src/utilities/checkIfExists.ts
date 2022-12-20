import Session from "../database/Session";
import User from "../database/User";

function checkSession (userName: string){
    return Session.findOne({userName: userName});
};

function checkUser (userName: string){
    return User.findOne({userName: userName});
};

export default {checkSession, checkUser};