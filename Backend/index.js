//import {results5} from '../sistemaBus_VR/src/componentes/Recuperado'

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())



const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'vehi_bus'
})


app.get('/', (re, res) => {
    return res.json("from backend side");
});

//traer registros  GET

app.get('/registro', (req, res) => {
    const sql = "SELECT * FROM vehiculo_robado";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/registroRec', (req, res) => {
    const sql = "SELECT * FROM vehiculo_recuperado";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

//LLENAR SELECT CON REGISTROS DE LA BD
app.get('/llenar', (req, res) => {
    const sql = "SELECT * FROM color";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.get('/entidades', (req, res) => {
    const sql = "SELECT * FROM entidades";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.get('/municipios/:id_entidad', async (req, res) => {
    //const id_entidad_recupera = req.body.id_entidad;
    const id_entidad = req.params.id_entidad;
    const sql = ("SELECT ENTIDAD, MUNICIPIO, ID_MUNICIPIO FROM entidades INNER JOIN municipios ON municipios.ID_ENTIDAD="+  req.params.id_entidad+" AND entidades.ID_ENTIDAD ="+ req.params.id_entidad);
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.get('/fuente', (req, res) => {
    const sql = ("SELECT * from fuente LEFT JOIN vehiculo_recuperado ON vehiculo_recuperado.ID_FUENTE = fuente.ID_FUENTE");
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})

app.get('/ultimoId', (req, res) => {
    const sql = ("SELECT MAX(ID_ALTERNA) AS id FROM vehiculo_recuperado");
    const id_last = req.params.id_alterna;
    const id_alterna = id_last + 1;
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
})




// CRear un registro POST

app.post("/crear", (req, res) => {

    const averiguacion = req.body.averiguacion;
    const fecha_averigua = req.body.fecha_averigua;
    const agencia_mp = req.body.agencia_mp;


    db.query(
        "INSERT INTO vehiculo_robado (averiguacion,fecha_averigua,agencia_mp) VALUES (?,?,?)",
        [averiguacion, fecha_averigua, agencia_mp],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("registrado")
            }
        }
    )

})

app.post("/crearRecuperado", (req, res) => {

    const placa = req.body.placa;
    const serie = req.body.serie;
    const calle = req.body.calle_rec;
    const numext = req.body.numext_rec;
    const colonia = req.body.colonia_rec;
    const codigoPostal = req.body.cp_rec;
    const fecha = req.body.fecha_rec;
    const hora = req.body.hora_rec;
    const id_color = req.body.id_color;
    const id_fuente = req.body.id_fuente;
    const id_entidad_recupera = req.body.id_entidad_recupera;
    const id_alterna = req.body.id_alterna;
    const lastId = id_alterna + 1;
    const id_municipio_rec = req.body.id_municipio_rec;
    const fechaToday =  req.body.fecha;
    const horaToday = req.body.hora;

    //TIPO DE MOVIMIENTO = CAMBIO
    // ESTATUS = RECUPERADO
    // PROCESADO = 0
    // ID_FUENTE = 10

    db.query(
        "INSERT INTO vehiculo_recuperado (ID_ALTERNA, PLACA, SERIE, CALLE_REC, NUMEXT_REC, COLONIA_REC, CP_REC, FECHA_REC, HORA_REC, ID_COLOR, ID_FUENTE, ID_ENTIDAD_RECUPERA, ID_MUNICIPIO_REC) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [id_alterna, placa, serie, calle, numext, colonia, codigoPostal, fecha, hora, id_color, 10, id_entidad_recupera, id_municipio_rec],
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                db.query(
                    "INSERT INTO control_alterna (ID_ALTERNA, ID_FUENTE, TIPO_MOVIMIENTO, ESTATUS, FECHA, HORA) VALUES (?,?,?,?,?,?)",
                    [id_alterna, 10, 'CAMBIO', 'RECUPERADO', fechaToday, horaToday],
                    (err, res) => {
                        if(err) {
                            console.log(err)
                        } else {
                           // alert('Registrado!!')
                        }
                    }
                )
               // res.send("registrado exitosamente !!")
               //alert('Registrado!!')
            }
        }
    )

})

app.post("/crearEntregado", (req, res) => {

    const id_alterna = req.body.id_alterna
    const calle_entrega = req.body.calle_entrega
    const colonia_entrega = req.body.colonia_entrega
    const id_municipio_entrega = req.body.id_municipio_entrega
    const id_entidadid_entrega = req.body.id_entidad_entrega
    const cp_entrega = req.body.cp_entrega
    const inspeccion = req.body.inspeccion
    const id_fuente_entrega = req.body.id_fuente_entrega
    const fecha_entrega = req.body.fecha_entrega
    const hora_entrega = req.body.hora_entrega
    const serie = req.body.serie
    const motor = req.body.motor
    const factura_vehiculo = req.body.factura_vehiculo
    const comprob_domic_prop = req.body.comprob_domic_prop
    const persona_entrega = req.body.persona_entrega
    const nombre_entrega = req.body.nombre_entrega
    const paterno_entrega = req.body.paterno_entrega
    const fechaToday =  req.body.fecha;
    const horaToday = req.body.hora;

    //TIPO DE MOVIMIENTO = CAMBIO
    // ESTATUS = RECUPERADO
    // PROCESADO = 0
    // ID_FUENTE = 10

    db.query(
        "INSERT INTO vehiculo_entregado (ID_ALTERNA, ID_FUENTE, CALLE_ENTREGA, COLONIA_ENTREGA, ID_MUNICIPIO_ENTREGA, ID_ENTIDAD_ENTREGA, CP_ENTREGA, INSPECCION, ID_FUENTE_ENTREGA, FECHA_ENTREGA, HORA_ENTREGA, SERIE, MOTOR, FACTURA_VEHICULO, COMPROB_DOMIC_PROP, PERSONA_ENTREGA, NOMBRE_ENTREGA, PATERNO_ENTREGA) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [id_alterna, 10, calle_entrega, colonia_entrega, id_municipio_entrega, id_entidadid_entrega, cp_entrega, inspeccion, 10, fecha_entrega, hora_entrega, serie, motor, factura_vehiculo, comprob_domic_prop, persona_entrega, nombre_entrega, paterno_entrega],
        (err, res) => {
            if (err) {
                console.log(err);
            } else {
                db.query(
                    "INSERT INTO control_alterna (ID_ALTERNA, ID_FUENTE, TIPO_MOVIMIENTO, ESTATUS, FECHA, HORA) VALUES (?,?,?,?,?,?)",
                    [id_alterna, 10, 'CAMBIO', 'ENTREGADO', fechaToday, horaToday],
                    (err, res) => {
                        if(err) {
                            console.log(err)
                        } else {
                           // alert('Registrado!!')
                        }
                    }
                )
               // res.send("registrado exitosamente !!")
               //alert('Registrado!!')
            }
        }
    )

})

app.get("/maxId", (req, res) => {
    db.query("SELECT MAX(ID_ALTERNA) AS id FROM vehiculo_recuperado"), (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    }

    console.log(result)
})



//seleccion por id

app.get('/buscarId/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM registro WHERE id= ?", id, (err, result) => {
        if (err) {
            console.log("sindata");
        } else {
            res.send(result);
        }
    })
})

// para modificar
//video /users/:id
app.put("/modificar/:id", (req, res) => {
    const id = req.params.id;
    const query_u = "UPDATE registro SET `nombre`=?, `apellido`=?, `edad`=? WHERE id=? ";
    const values = [
        req.body.nombre,
        req.body.apellido,
        req.body.edad,
    ];
    db.query(query_u, [...values, id], (err, result) => {
        if (err) return res.send(err);
        return res.json(result)
    })





})





app.listen(8081, () => {
    console.log("escuchando");
})