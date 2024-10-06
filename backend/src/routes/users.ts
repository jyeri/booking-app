import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// for /api/users/register
router.post("/register", [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required, with more than 6 characters").isLength({min: 6}),
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("mobile", "Phonenumber is required").isLength({min: 1}),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() }) as any;
    }
    try {
        let user = await User.findOne({ 
            email: req.body.email,
        });

        if (user) {
            return res.status(400).json({ message: "User already exists" }) as any;
        }

        user = new User(req.body);
        await user.save();


        const token = jwt.sign({userId: user.id}, 
            process.env.JWT_SECRET_KEY as string,
            {expiresIn: "1d"},
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })
        return res.status(200).send( { message: "User registered, everything OK" } ) as any;
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went horribly wrong" }) as any;
    }
});

export default router;