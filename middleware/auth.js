const jwt = require("jwt-simple");
const moment = require("moment");
require('dotenv').config();

// Verificación de JWT_SECRET
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");

//Funcion de autenticacion
exports.auth = (req, res, next) => {

    //Comprobar si llega la cabecera de autenticacion
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "Request does not have the authentication header" })
    }

    //Limpiamos el token de comillas
    let token = req.headers.authorization.replace(/['"]+/g, '');

    //#region DECODIFICAR TOKEN
    try {

        let payload = jwt.decode(token, process.env.JWT_SECRET);

        //Comprobar la expiración del token
        if (payload.exp <= moment().unix()) { return res.status(401).send({ message: "Token expired",}) }

        //Agregar datos de usuario a request
        req.vote = payload;

    } catch (error) {
        return res.status(404).send({
            message: "Invalid token",
            error: error.message
        })
    }
    //#endregion  DECODIFICAR TOKEN


    //Pasar a ejecucion de la accion
    next();
}

