const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


// Dar formato a los datos que lleguen en el body
app.use(express.json());//convierte en json los datos que llegan con un content type json 
app.use(express.urlencoded({ extended: true }))//convierte en json los datos que lleguen en formato form-urlencode
app.use(cors({
    origin: '*', // Permite solicitudes desde cualquier origen
    methods: ['POST', 'GET', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Cabeceras permitidas
}));

const voterRoutes = require('./routes/voter.js');
app.use('/election/voter', voterRoutes)
app.listen(port, () => console.log(`app listening on port ${port}!`));