const jwt = require("jwt-simple");//libreria que usada para generar token
const moment = require("moment");
require('dotenv').config();

// Verificación de JWT_SECRET
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");


//3. Crear funcion para generar tokens
const createToken = (voter_id, candidate_id) => {

    if(!voter_id || !candidate_id)  throw new Error("Incomplete data to generate token.");

    const payload = {
        voter_id,
        candidate_id,
        iat: moment().unix(),//fecha creacion en formato unix
        exp: moment().add(30, "minutes").unix()//fecha de expiración
    }

    //Devolver jwt codificado
    return jwt.encode(payload, process.env.JWT_SECRET);
}

module.exports = {
    createToken
}