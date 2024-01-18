import { Router } from 'express';
// necesitamos modelo para persistir en la bd
import userModel from '../models/user.model.js';

const router = Router();

// register
router.post('/register', async (req, res) => {
 const { first_name, last_name , email, age, password } = req.body;
 console.log("Registrando usuario");
 console.log(req.body);

 // valiamos si el user existe en la DB
 const exist = await userModel.findOne({ email});
 if (exist) {
     return res.status(400).send({status:'error', msg:"Usuario ya existe en la DB!  "});
 }



 const user = { 
    first_name,
     last_name , 
     email, 
     age, 
     password
    };

 
 const result = await userModel.create(user);
 res.send({ status: "success", message: "Usuario creado con extito con ID: " + result.id });
});

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password  });

    if (!user) { return res.status(401).send({status:'error', msg:"Incorrect credentials'"}); }

    let rol="usuario";
    if (user.email.includes("admin")){
       rol="admin";
    }

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        rol: rol
    };
    
    res.send({ status: 'success' , payload: req.session.user, msg: "primer logueo realizado!!"});

});

export default router;