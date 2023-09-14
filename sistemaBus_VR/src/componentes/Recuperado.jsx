import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../archivosCss/formulario.css"
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

export const Recuperado = () => {

    let id_alterna = 0
    let id_entidad = 0

    const [recuperado, setRecuperado] = useState({
        placa: '',
        serie: '',
        calle_rec: '',
        numext_rec: '',
        colonia_rec: '',
        cp_rec: '',
        fecha_rec: '',
        hora_rec: '',
        id_color: '',
        id_fuente: '',
        id_entidad_recupera: '',
        id_municipio_rec: '',
        fecha: ''
    })

    const [showModalValidacion, setShowModalValidacion] = useState(false)
    const [showModalSuccess, setShowModalSuccess] = useState(false)



    const [ultimoId, setUltimoId] = useState([])
    let results5 = []

    const [llenado, setLlenado] = useState([])
    let results = []

    const [entidades, setEntidades] = useState([])
    let results2 = []

    const [municipios, setMunicipios] = useState([])
    let results3 = []

    const [fuente, setFuente] = useState([])
    let results4 = []

    const [entidadSeleccionada, setEntidadSeleccionada] = useState('')

    const [descValidacion, setDescValidacion] = useState('')

    const handleCloseModalValidacion = () => {
        setDescValidacion('')
        setShowModalValidacion(false)
    }

    const handleCloseModalSuccess = () => {
        setShowModalSuccess(false)
    }

    const handleShowModalValidacion = () => setShowModalValidacion(true)
    const handleShowModalSuccess = () => setShowModalSuccess(true)

    const LlenarSelect = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/llenar");
            setLlenado(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const entidadesSelect = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/entidades");
            setEntidades(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const municipiosSelect = async (id_entidad) => {
        id_entidad = entidades.ID_ENTIDAD
        console.log(entidades.ID_ENTIDAD + "ENTIDADES")
        try {
            const { data } = await axios.get("http://localhost:8081/municipios", { id_entidad: id_entidad })
            setMunicipios(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const cargarMunicipios = async (entidadId) => {
        try {
            const response = await axios.get(`http://localhost:8081/municipios/${entidadId}`);
            setMunicipios(response.data)
        } catch (error) {
            console.error('Error al cargar los municipios:', error);
        }
    }

    const fuenteSelect = async () => {
        try {
            const { data } = await axios.get("http://localhost:8081/fuente")
            setFuente(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const ultimoIdSelect = async () => {
        //let id_alterna = req.params.id_alterna
        try {
            const { data } = await axios.get("http://localhost:8081/ultimoId")
            setUltimoId(data)
        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        LlenarSelect()
        entidadesSelect()
        fuenteSelect()
        ultimoIdSelect()
    }, [])

    results = llenado
    results2 = entidades
    results3 = municipios
    results4 = fuente
    results5 = ultimoId

    const formatoDia = () => {

        let fecha
        let today = new Date()
        // var n = today.toISOString();
        //console.log ("fecha",n)
        let mes = today.getMonth() + 1
        fecha = today.getFullYear() + "/" + mes + "/" + today.getDate()
        recuperado['fecha'] = fecha
        console.log("la fecha de la funcion es :", fecha)
    }

    const formatoHora = () => {
        let horaCompleta
        let today = new Date()
        let hora = today.getHours()
        let minutos = today.getMinutes()
        //let segundos = today.getSeconds()
        horaCompleta = hora + ':' + minutos
        recuperado['hora'] = horaCompleta
        console.log('La hora de registro es: ', horaCompleta)
    }

    const handleChange = (e) => {
        formatoDia()
        formatoHora()
        id_alterna = document.getElementById('id_alterna').value
        setRecuperado((prev) => ({ ...prev, id_alterna, [e.target.name]: e.target.value }))
        id_entidad = document.getElementById('id_entidad_recupera')
    }

    const handleEntidadChange = (event) => {
        const selectedEntidad = event.target.value;
        setEntidadSeleccionada(selectedEntidad);

        // Cargar los municipios correspondientes a la entidad seleccionada
        if (selectedEntidad) {
            cargarMunicipios(selectedEntidad);
        } else {
            // Si no se selecciona ninguna entidad, vaciar la lista de municipios
            setMunicipios([]);
        }
    }

    //OBTENER LA FECHA ACTUAL PARA VALIDAD INPUT TYPE DATE
    let today = new Date().toISOString().split('T')[0];
    let minDate = "1900-01-01"

    console.log(recuperado)

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(recuperado)


        try {
            console.log("Entre al try")
            let camposValidados = validarCampos()

            if (!camposValidados) return

            await axios.post("http://localhost:8081/crearRecuperado", recuperado);
            console.log(setRecuperado + "SetRecuperado")
            alert("El nuevo registro ha sido guardado correctamente ")
            navigate("/")

        } catch (err) {
            console.log(err)
        }
    }

    const validarCampos = () => {
        let hayErrores = false
        let desc = ''

        if (recuperado.serie.includes('o') || recuperado.serie.includes('i') || recuperado.serie.includes('ñ') || recuperado.serie.includes('q')) {
            desc = desc + 'la serie no debe contener (o,i,ñ,q) '
            //document.querySelector("label[for='serie']").textContent = "SERIE: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='serie']").textContent = "SERIE:"
        }

        if (recuperado.serie.length < 1) {
            desc = desc + ' hay que llenar el campo serie'
            //document.querySelector("label[for='serie']").textContent = "SERIE: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='serie']").textContent = "SERIE:"
        }

        if (recuperado.id_entidad_recupera.length < 1) {
            desc = desc + ' hay que llenar el campo entidad'
            //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.id_municipio_rec.length < 1) {
            desc = desc + ' hay que llenar el campo municipio'
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.colonia_rec.length < 1) {
            desc = desc + ' hay que llenar el campo colonia'
            //document.querySelector("label[for='colonia_rec']").textContent = "COLONIA: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='colonia_rec']").textContent = "COLONIA:"
        }

        if (recuperado.serie.includes("  ") || recuperado.serie.startsWith(" ") || recuperado.serie.endsWith(" ")) {
            desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
            //document.querySelector("label[for='serie']").textContent = "SERIE: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='serie']").textContent = "SERIE:"
        }

        if (recuperado.id_entidad_recupera.includes("  ") || recuperado.id_entidad_recupera.startsWith(" ") || recuperado.id_entidad_recupera.endsWith(" ")) {
            desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
            //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.id_municipio_rec.includes("  ") || recuperado.id_municipio_rec.startsWith(" ") || recuperado.id_municipio_rec.endsWith(" ")) {
            desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
        }

        if (recuperado.colonia_rec.includes("  ") || recuperado.colonia_rec.startsWith(" ") || recuperado.colonia_rec.endsWith(" ")) {
            desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
            //document.querySelector("label[for='colonia_rec']").textContent = "COLONIA: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='colonia_rec']").textContent = "COLONIA:"
        }
        if (recuperado.placa.includes("  ") || recuperado.placa.startsWith(" ") || recuperado.placa.endsWith(" ")) {
            desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
            //document.querySelector("label[for='placa']").textContent = "PLACA: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='placa']").textContent = "PLACA:"
        }

        if (recuperado.calle_rec.includes("  ") || recuperado.calle_rec.startsWith(" ") || recuperado.calle_rec.endsWith(" ")) {
            desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
            //document.querySelector("label[for='calle_rec']").textContent = "CALLE: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='calle_rec']").textContent = "CALLE:"
        }

        if (recuperado.numext_rec.includes("  ") || recuperado.numext_rec.startsWith(" ") || recuperado.numext_rec.endsWith(" ")) {
            desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
            //document.querySelector("label[for='numext_rec']").textContent = "NUMERO EXTERIOR: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='numext_rec']").textContent = "NUMERO EXTERIOR:"
        }

        if (recuperado.cp_rec.includes("  ") || recuperado.cp_rec.startsWith(" ") || recuperado.cp_rec.endsWith(" ")) {
            desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
            //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL: (INVALIDO)"

            hayErrores = true
        } else {
            //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL:"
        }

        if (hayErrores) {
            setDescValidacion(desc)
            handleShowModalValidacion()
            return false
        } else {
            handleShowModalSuccess()
            return true
        }

    }

    return (
        <>
            <Navbar />
            <div className='area-form'>
                <div className='contenedor'>
                    <form class="row g-3">
                        <center><h1> REGISTRO DE VEHICULOS RECUPERADOS</h1></center>
                        <br />
                        {results5.map(ultimoId => {
                            return (
                                <input id='id_alterna' type="hidden" name="id_alterna" key={ultimoId.id} value={ultimoId.id + 1} onChange={handleChange} ></input>

                            )
                        })}

                        <div class="col-4">
                            <label className="form-label" for='id_entidad_recupera' >ENTIDAD:</label>
                            <br />
                            <select className="form-control" id="id_entidad_recupera" name="id_entidad_recupera" onChange={handleEntidadChange} onClick={handleChange}>
                                <option>ENTIDAD QUE RECUPERÓ EL VEHICULO</option>
                                {results2.map(entidades => {
                                    return (
                                        <option name={entidades.ID_ENTIDAD} key={entidades.ID_ENTIDAD} value={entidades.ID_ENTIDAD}>{entidades.ENTIDAD}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div class="col-4">
                            <label className="form-label" for='id_municipio_rec' >MUNICIPIO:</label>
                            <br />
                            <select className='form-control' id='id_municipio_rec' name='id_municipio_rec' onChange={handleChange}>
                                <option value="">MUNICIPIO QUE RECUPERÓ EL VEHICULO</option>
                                {municipios.map((municipio) => (
                                    <option key={municipio.ID_MUNICIPIO} value={municipio.ID_MUNICIPIO}>
                                        {municipio.MUNICIPIO}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div class="col-md-2">
                            <label className="form-label" for='placa' > PLACA:</label>
                            <input type="text" className="form-control" id="placa" name="placa" ng-trim="false" onChange={handleChange} />
                        </div>
                        <div class="col-3">
                            <label className="form-label" class="col-sm-10" for='serie' >SERIE:</label>
                            <input type="text" className="form-control" id="serie" name="serie" onChange={handleChange} />
                        </div>

                        <div class="col-md-3">
                            <label className="form-label" for='calle_rec' > CALLE:</label>
                            <input type="text" className="form-control" id="calle_rec" name="calle_rec" onChange={handleChange} />
                        </div>
                        <div class="col-md-2">
                            <label className="form-label" for='numext_rec' > NÚMERO EXTERIOR:</label>
                            <input type="text" className="form-control" id="numext_rec" name="numext_rec" onChange={handleChange} />
                        </div>
                        <div class="col-md-3">
                            <label className="form-label" for='colonia_rec' > COLONIA:</label>
                            <input type="text" className="form-control" id="colonia_rec" name="colonia_rec" onChange={handleChange} />
                        </div>

                        <div class="col-2">
                            <label className="form-label" for='cp_rec' > CÓDIGO POSTAL:</label>
                            <input type="text" className="form-control" id="cp_rec" name="cp_rec" onChange={handleChange} />
                        </div>
                        <div class="col-md-4">
                            <label className="form-label" >COLOR DEL AUTOMÓVIL: </label>
                            <br />
                            <select className="form-control" id="id_color" name="id_color" onChange={handleChange}>
                                <option>SELECCIONE UN COLOR</option>
                                {results.map(llenado => {
                                    return (
                                        <option name={llenado.ID_COLOR} key={llenado.ID_COLOR} value={llenado.ID_COLOR}>{llenado.DESCRIPCION}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label className="form-label" > FECHA:</label>
                            { }
                            <input type="date" max={today} min={minDate} className="form-control" id="fecha_rec" name="fecha_rec" onChange={handleChange} />
                        </div>
                        <div class="col-md-3">
                            <label className="form-label" > HORA:</label>
                            <input type="time" className="form-control" id="hora_rec" name="hora_rec" onChange={handleChange} />
                        </div>
                        <div class="col-md-4">
                            <Button variant="primary" type="submit" onClick={handleClick}>Enviar</Button>
                            <Link to="/" className="btn btn-info"> Inicio</Link>
                        </div>
                    </form>

                </div>


                <Modal aria-labelledby="contained-modal-title-vcenter" size="lg" dialogClassName="modal-90w" centered show={showModalValidacion} onHide={handleCloseModalValidacion}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ha ocurrido un error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{descValidacion}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModalValidacion}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal aria-labelledby="contained-modal-title-vcenter" centered show={showModalSuccess} onHide={handleCloseModalSuccess}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Se ha registrado satisfactoriamente!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModalSuccess}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </>
    )
}
