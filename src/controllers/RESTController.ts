import { Request, Response } from "express";
import User from "../database/User";

// returns all users
const getUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    if (users.length === 0) return res.send("There are no users");
    return res.json(users);
};

export default {getUsers};