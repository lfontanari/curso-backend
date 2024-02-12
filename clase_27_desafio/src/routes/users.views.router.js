import { Router } from 'express';
import passport from 'passport';
import { authToken } from '../utils.js';

import { passportCall, authorization } from "../utils.js";

const router = Router();


router.get("/login", (req, res) => {
    res.render('login')
})

router.get("/register", (req, res) => {
    res.render('register')
})

router.get("/", 
    // authToken, // --> usando Authorization Bearer Token
    // passport.authenticate('jwt', {session: false}), // --> Usando JWT por Cookie
    passportCall('jwt'),
    authorization('user'),   // --> Autorizo a ver el perfil del usuario si tiene role=user
    (req, res) => {
    res.render('profile', {
        user: req.user
    })
});

router.get("/error", (req, res) => {
    res.render("error");
});

export default router;