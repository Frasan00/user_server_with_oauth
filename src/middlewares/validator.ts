import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const dataValidation: any[] = [
    body("userName").exists().isLength({min: 2, max: 20}),
    body("password").exists().isAlphanumeric().isLength({min: 8, max: 20}),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (errors.isEmpty() === true) next();
        else return res.status(400).json( {errors: errors.array()} );
    }
];

export default dataValidation;