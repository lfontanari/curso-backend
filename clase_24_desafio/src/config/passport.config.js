import passport from 'passport';
import userModel from '../models/user.model.js';
import jwtStrategy from 'passport-jwt';
import { PRIVATE_KEY } from '../utils.js';

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

//  Declaramos estrategia
// Estrategia de obtener Token JWT por medio de Cookie:
const initializePassport = () => {

    // Usando JWT
    passport.use('jwt', new JwtStrategy(
        { 
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: PRIVATE_KEY

        }, async (jwt_payload,done) => {
        
            console.log("entrando a passport strategy con JWT...");
        try {
            console.log("jwt obtenido del payload...");
            console.log(jwt_payload);
            return done (null, jwt_payload.user)

        } catch (err) {
            return done (err);
        }
        }
   
    ))





    //Funciones de Serializacion y Desserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user)
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    })

    // estas funciones permiten a Passport.js manejar la información del usuario durante el proceso de autenticación, serializando y deserializando los usuarios para almacenar y recuperar información de la sesión. Estas funciones son esenciales cuando se implementa la autenticación de usuarios en una aplicación Node.js utilizando Passport.js.
}


const cookieExtractor = req => {
    let token = null;
    console.log("entrando a cookie extractor");
    if (req && req.cookies) { // validamos q exista el request y la cookie
        
        token = req.cookies['jwtCookieToken'];
        
    }
     return token;
};

export default initializePassport;
