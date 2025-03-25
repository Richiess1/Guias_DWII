import {Router, Request, Response} from 'express';
import {body} from 'express-validator';
import { createAccount, login } from './controllers/User.Controller';

const router = Router();

router.get("/", (req: Request, res: Response)=>{
    res.status(200).send("Bienvenido a la API");
});

router.post('/auth/register',[
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("password").isString().isLength({min:8}).withMessage("The password must be at least 8 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("username").isString().notEmpty().withMessage("Username is required")],
    async (req, res)=>{
        createAccount(req, res);
    });

export default router;

router.post("/auth/login",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").notEmpty().withMessage("Password must be at least 8 characters"),
    ], 
    async (req, res) =>{
        login(req, res);
    }
)