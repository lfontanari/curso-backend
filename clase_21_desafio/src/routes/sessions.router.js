import { Router } from 'express';
// necesitamos modelo para persistir en la bd
import userModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';
import passport from 'passport';

const router = Router();
// =================================================================
//                  Passport Github 
// =================================================================

router.get('/github', passport.authenticate('github', {scope: ['user:email']}),
async (req, res) => {
    { }
});

router.get('/githubcallback', passport.authenticate('github ', { failureRedirect: '/github/error'}),
 async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
        
    };
    req.session.admin = true;
    res.redirect("/users");
 });


// =================================================================
//                  Passport Local
// =================================================================
// register
router.post('/register', passport.authenticate('register', { failureRedirect: 'api/session/fail-register    '}),  async (req, res) => {
  
 console.log("Registrando usuario");
 res.status(201).send({ status: "success" , message: "Usuario creado con exito. "});

 // valiamos si el user existe en la DB
 const exist = await userModel.findOne({ email});
 if (exist) {
     return res.status(400).send({status:'error', msg:"Usuario ya existe en la DB!  "});
 }


});

// login
router.post('/login', passport.authenticate('login',
{
    failureRedirect: 'api/session/fail-login'

}),async (req, res) => {
    
    console.log("usuario encontrado para iniciar sesión :");
    const user = req.user;
    console.log(user);

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
        
    };
    
    res.send({ status: 'success' , payload: req.session.user, msg: "primer logueo realizado!!"});

});

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Fallo el proceso de registración!"});
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Fallo el proceso de login!"});
})

export default router;