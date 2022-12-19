import jwt from "jsonwebtoken";

export default function tokenGenerator(userName: string){
    if (!process.env.JWT_KEY) return -1
    return jwt.sign(userName, process.env.JWT_KEY);
};