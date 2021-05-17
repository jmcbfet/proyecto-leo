const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;

app.use("/comentarios", require('./routes/comentarios'))
app.use("/cuentas",     require('./routes/cuentas'))
app.use("/galeria",     require('./routes/galeria'))
app.use("/mesas",       require('./routes/mesas'))
app.use("/platos",      require('./routes/platos'))
app.use("/reserva",     require('./routes/reserva'))
app.use("/sugerencias", require('./routes/sugerencias'))
app.use("/user",        require('./routes/user'))

app.listen(PORT, () => {
    console.log("localhost:" + PORT);
})