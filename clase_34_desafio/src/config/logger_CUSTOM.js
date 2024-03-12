import winston, { transports } from "winston";
import config from "./config.js";
import program from '../process.js';

//TODO:: Creating our logger:
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
};


// Logger en env prod
const prodLogger = winston.createLogger({
    // solo por archivo de log, a partir de "info"
    levels: customLevelsOptions.levels,
    transports: [
        
        new winston.transports.File(
            {
                filename: './errors.log',
                level: 'info',  
                format: winston.format.simple()
            }
        )
    ]
})


// Logger en env desarrollo
const devLogger = winston.createLogger({
    // solo por consola, a partir de "debug"
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ level: "debug" }),
       
    ]
})

// Declaramos a middleware
export const addLogger = (req, res, next) => {
    //console.log(program.opts().mode);  
    if (program.opts().mode === 'prod') {
        req.logger = prodLogger

        req.logger.info(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        req.logger.fatal(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

    } else {
        req.logger = devLogger
        req.logger.debug(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        req.logger.http(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        req.logger.info(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        req.logger.warning(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        req.logger.error(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        req.logger.fatal(`${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    }
    next();
}
