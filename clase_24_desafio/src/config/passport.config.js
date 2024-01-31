import passport from 'passport';
import passportLocal from 'passport-local';
import GitHubStrategy from 'passport-github2';
import userModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';


//  Declaramos estrategia
const localStrategy = passportLocal.Strategy;

const initializePassport = () => {

    // Usando GitHub
    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.d6339fc331b8ef9a',
            clientSecret: '31cfbe8c9f93bff4af8bb3b87589211b5ca578b1',
            callbackUrl: 'http://localhost:8080/api/sessions/githubcallback'
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("Profile obtenido del usuario de GitHub: ");
            console.log(profile);
            try {
                //Validamos si el user existe en la DB
                console.log(profile);
                const user = await userModel.findOne({ email: profile._json.email });
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + profile._json.email);
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        age: 28,
                        email: profile._json.email,
                        password: '',
                        loggedBy: "GitHub"
                    }
                    const result = await userModel.create(newUser);
                    return done(null, result)
                } else {
                    // Si entramos por aca significa que el user ya existe en la DB
                    return done(null, user)
                 }
            
            } catch (error) {
                return done(error)
            }
        }
    ))



    /**
          *  Inicializando la estrategia local, username sera para nosotros email.
          *  Done será nuestro callback
         */

    passport.use('register', new localStrategy(
        // passReqToCallback: para convertirlo en un callback de request, para asi poder iteracturar con la data que viene del cliente
        // usernameField: renombramos el username
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            try {
                //Validamos si el user existe en la DB
                const exist = await userModel.findOne({ email });
                if (exist) {
                    console.log("El user ya existe!!");
                    done(null, false)
                }

                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    
                    password: createHash(password)
                }
                const result = await userModel.create(user);
                // Todo sale ok
                return done(null, result)

            } catch (error) {
                return done("Error registrando al usuario " + error);
            }

        }

    ))


    //Estrategia de Login:
    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.warn("Invalid credentials for user: " + username);
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );



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


export default initializePassport;