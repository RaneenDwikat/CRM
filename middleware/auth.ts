import jwt from "jsonwebtoken";
import admins from "../model/super";
import employees from "../model/employee";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
    _id: string;
}

export default function auth(role: string) {
    return async function name(req: Request, res: Response, next: NextFunction) {
        let user:string |null = "";
        try {
            const token = req.headers.authorization?.replace("Bearer ", "");
            if (token) {
                const decoded: JwtPayload = jwt.verify(token, "secret") as JwtPayload;

                if (decoded) {
                    if (role === "super") {
                        user = await admins.findOne({ _id: decoded._id });
                    } else if (role === "employee") {
                        user = await employees.findOne({ _id: decoded._id });
                    }
                    if (user) {
                        next();
                    }else{
                        return res.status(401).json({ error: "Not Authenticated!" });
                    }
                }
            }else{
                return res.status(401).json({ error: "Not authorization!" });
            }
        } catch (error) {
            return res.status(401).json({ error: error });
        }
    };
}
