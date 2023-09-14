import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import "../archivosCss/formulario.css"
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { Link, useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

export const Entregado = () => {

  let id_alterna = 0
  let id_entidad = 0

  const [entregado, setEntregado] = useState({
    id_fuente: '',
    calle_entrega: '',
    colonia_entrega: '',
    id_municipio_entrega: '',
    id_entidad_entrega: '',
    cp_entrega: '',
    inspeccion: '',
    id_fuente_entrega: '',
    fecha_entrega: '',
    hora_entrega: '',
    serie: '',
    motor: '',
    factura_vehiculo: '',
    comprob_domic_prop: '',
    persona_entrega: '',
    nombre_entrega: '',
    paterno_entrega: ''
  })

  const [showModalValidacion, setShowModalValidacion] = useState(false)
  const [showModalSuccess, setShowModalSuccess] = useState(false)

  console.log(entregado)

  const [ultimoId, setUltimoId] = useState([])
  let results5 = []

  const [entidades, setEntidades] = useState([])
  let results2 = []

  const [municipios, setMunicipios] = useState([])
  let results3 = []

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
    entidadesSelect()
    ultimoIdSelect()
  }, [])

  results2 = entidades
  results3 = municipios
  results5 = ultimoId

  const formatoDia = () => {

    let fecha
    let today = new Date()
    // var n = today.toISOString();
    //console.log ("fecha",n)
    let mes = today.getMonth() + 1
    fecha = today.getFullYear() + "/" + mes + "/" + today.getDate()
    entregado['fecha'] = fecha
    console.log("la fecha de la funcion es :", fecha)
  }

  const formatoHora = () => {
    let horaCompleta
    let today = new Date()
    let hora = today.getHours()
    let minutos = today.getMinutes()
    //let segundos = today.getSeconds()
    horaCompleta = hora + ':' + minutos
    entregado['hora'] = horaCompleta
    console.log('La hora de registro es: ', horaCompleta)
  }

  const handleChange = (e) => {
    formatoDia()
    formatoHora()
    id_alterna = document.getElementById('id_alterna').value
    setEntregado((prev) => ({ ...prev, id_alterna, [e.target.name]: e.target.value }))
    id_entidad = document.getElementById('id_entidad_entrega')
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

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(entregado)

    try {
      console.log("Entre al try")
      let camposValidados = validarCampos()

      if (!camposValidados) return

      await axios.post("http://localhost:8081/crearEntregado", entregado);
      console.log(setEntregado + "SetEntregado")
      alert("El nuevo registro ha sido guardado correctamente ")
      navigate("/")

    } catch (err) {
      console.log(err)
    }
  }


  const validarCampos = () => {
    let hayErrores = false
    let desc = ''

    if (entregado.serie.includes('o') || entregado.serie.includes('i') || entregado.serie.includes('ñ') || entregado.serie.includes('q')) {
      desc = desc + 'la serie no debe contener (o,i,ñ,q) '
      //document.querySelector("label[for='serie']").textContent = "SERIE: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='serie']").textContent = "SERIE:"
    }

    if (entregado.serie.length < 1) {
      desc = desc + ' hay que llenar el campo serie'
      //document.querySelector("label[for='serie']").textContent = "SERIE: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='serie']").textContent = "SERIE:"
    }

    if (entregado.id_entidad_entrega.length < 1) {
      desc = desc + ' hay que llenar el campo entidad'
      //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO:"
    }

    if (entregado.id_municipio_entrega.length < 1) {
      desc = desc + ' hay que llenar el campo municipio'
      //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='id_entidad_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
    }

    if (entregado.colonia_entrega.length < 1) {
      desc = desc + ' hay que llenar el campo colonia'
      //document.querySelector("label[for='colonia_rec']").textContent = "COLONIA: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='colonia_rec']").textContent = "COLONIA:"
    }

    if (entregado.serie.includes("  ") || entregado.serie.startsWith(" ") || entregado.serie.endsWith(" ")) {
      desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
      //document.querySelector("label[for='serie']").textContent = "SERIE: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='serie']").textContent = "SERIE:"
    }

    if (entregado.id_entidad_entrega.includes("  ") || entregado.id_entidad_entrega.startsWith(" ") || entregado.id_entidad_entrega.endsWith(" ")) {
      desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
      //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='id_entidad_recupera']").textContent = "ENTIDAD QUE RECUPERA EL VEHICULO:"
    }

    if (entregado.id_municipio_entrega.includes("  ") || entregado.id_municipio_entrega.startsWith(" ") || entregado.id_municipio_entrega.endsWith(" ")) {
      desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
      //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
    }

    if (entregado.colonia_entrega.includes("  ") || entregado.colonia_entrega.startsWith(" ") || entregado.colonia_entrega.endsWith(" ")) {
      desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
      //document.querySelector("label[for='colonia_rec']").textContent = "COLONIA: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='colonia_rec']").textContent = "COLONIA:"
    }
    if (entregado.calle_entrega.includes("  ") || entregado.calle_entrega.startsWith(" ") || entregado.calle_entrega.endsWith(" ")) {
      desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
      //document.querySelector("label[for='placa']").textContent = "PLACA: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='placa']").textContent = "PLACA:"
    }

    if (entregado.motor.includes("  ") || entregado.motor.startsWith(" ") || entregado.motor.endsWith(" ")) {
      desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
      //document.querySelector("label[for='numext_rec']").textContent = "NUMERO EXTERIOR: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='numext_rec']").textContent = "NUMERO EXTERIOR:"
    }

    if (entregado.cp_entrega.includes("  ") || entregado.cp_entrega.startsWith(" ") || entregado.cp_entrega.endsWith(" ")) {
      desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
      //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL:"
    }

    if (entregado.factura_vehiculo.includes("  ") || entregado.factura_vehiculo.startsWith(" ") || entregado.factura_vehiculo.endsWith(" ")) {
      desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
      //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL:"
    }

    if (entregado.comprob_domic_prop.includes("  ") || entregado.comprob_domic_prop.startsWith(" ") || entregado.comprob_domic_prop.endsWith(" ")) {
      desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
      //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL:"
    }

    if (entregado.nombre_entrega.includes("  ") || entregado.nombre_entrega.startsWith(" ") || entregado.nombre_entrega.endsWith(" ")) {
      desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
      //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL:"
    }

    if (entregado.paterno_entrega.includes("  ") || entregado.paterno_entrega.startsWith(" ") || entregado.paterno_entrega.endsWith(" ")) {
      desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
      //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='cp_rec']").textContent = "CODIGO POSTAL:"
    }

    if (entregado.persona_entrega.includes("  ") || entregado.persona_entrega.startsWith(" ") || entregado.persona_entrega.endsWith(" ")) {
      desc = desc + ' el campo no debe contener doble espacio ni empezar/terminar con espacio'
      //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO: (INVALIDO)"

      hayErrores = true
    } else {
      //document.querySelector("label[for='id_municipio_rec']").textContent = "MUNICIPIO QUE RECUPERA EL VEHICULO:"
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
          <form class='row g-3'>
            <center><h1>REGISTRO DE VEHICULOS ENTREGADOS</h1></center>
            {results5.map(ultimoId => {
              return (
                <input id='id_alterna' type="hidden" name="id_alterna" key={ultimoId.id} value={ultimoId.id + 1} onChange={handleChange} ></input>

              )
            })}
            <div class="col-md-3">
              <label className="form-label" for='calle_entrega' > CALLE DONDE SE ENTREGO:</label>
              <input type="text" className="form-control" id="calle_entrega" name="calle_entrega" onChange={handleChange} />
            </div>
            <div class="col-md-3">
              <label className="form-label" for='colonia_entrega' > COLONIA DONDE SE ENTREGO:</label>
              <input type="text" className="form-control" id="colonia_entrega" name="colonia_entrega" onChange={handleChange} />
            </div>
            <div class="col-4">
              <label className="form-label" for='id_entidad_entrega' >ENTIDAD:</label>
              <br />
              <select className="form-control" id="id_entidad_entrega" name="id_entidad_entrega" onChange={handleEntidadChange} onClick={handleChange}>
                <option>ENTIDAD QUE RECUPERÓ EL VEHICULO</option>
                {results2.map(entidades => {
                  return (
                    <option name={entidades.ID_ENTIDAD} key={entidades.ID_ENTIDAD} value={entidades.ID_ENTIDAD}>{entidades.ENTIDAD}</option>
                  )
                })}
              </select>
            </div>
            <div class="col-4">
              <label className="form-label" for='id_municipio_entrega' >MUNICIPIO:</label>
              <br />
              <select className='form-control' id='id_municipio_entrega' name='id_municipio_entrega' onChange={handleChange}>
                <option value="">MUNICIPIO QUE RECUPERÓ EL VEHICULO</option>
                {municipios.map((municipio) => (
                  <option key={municipio.ID_MUNICIPIO} value={municipio.ID_MUNICIPIO}>
                    {municipio.MUNICIPIO}
                  </option>
                ))}
              </select>
            </div>
            <div class="col-md-2">
              <label className="form-label" for='cp_entrega' > CÓDIGO POSTAL:</label>
              <input type="text" className="form-control" id="cp_entrega" name="cp_entrega" onChange={handleChange} />
            </div>
            <div class="col-4">
              <label className="form-label" for='inspeccion' >INSPECCIÓN:</label>
              <br />
              <select className='form-control' id='inspeccin' name='inspeccion' onChange={handleChange}>
                <option value="">SELECCIONE UNA OPCIÓN</option>
                <option value='1'>INSPECCIÓN REALIZADA AL VEHICULO ENTREGADO</option>
                <option value='0'>NO REALIZADA</option>
              </select>
            </div>
            <div class="col-md-3">
              <label className="form-label" > FECHA:</label>
              { }
              <input type="date" max={today} min={minDate} className="form-control" id="fecha_entrega" name="fecha_entrega" onChange={handleChange} />
            </div>
            <div class="col-md-3">
              <label className="form-label" > HORA:</label>
              <input type="time" className="form-control" id="hora_entrega" name="hora_entrega" onChange={handleChange} />
            </div>
            <div class="col-md-3">
              <label className="form-label" for='serie' > SERIE:</label>
              <input type="text" className="form-control" id="serie" name="serie" onChange={handleChange} />
            </div>
            <div class="col-md-3">
              <label className="form-label" for='calle_entrega' > MOTOR:</label>
              <input type="text" className="form-control" id="motor" name="motor" onChange={handleChange} />
            </div>
            <div class="col-md-3">
              <label className="form-label" for='factura_vehiculo' > NÚMERO DE FACTURA:</label>
              <input type="text" className="form-control" id="factura_vehiculo" name="factura_vehiculo" onChange={handleChange} />
            </div>
            <div class="col-md-3">
              <label className="form-label" for='comprob_domic_prop' > COMPROBANTE DE DOMICILIO:</label>
              <input type="text" className="form-control" id="comprob_domic_prop" name="comprob_domic_prop" onChange={handleChange} />
            </div>
            <div class="col-4">
              <label className="form-label" for='persona_entrega' >PERSONA QUE ENTREGA EL VEHICULO:</label>
              <br />
              <select className='form-control' id='persona_entrega' name='persona_entrega' onChange={handleChange}>
                <option value="">SELECCIONE UNA OPCIÓN</option>
                <option value='1'>PROPIETARIO</option>
                <option value='2'>REPRESENTANTE</option>
              </select>
            </div>
            <div class="col-md-5">
              <label className="form-label" for='nombre_entrega' >NOMBRE DEL PROPIETARIO / REPRESENTANTE:</label>
              <input type="text" className="form-control" id="nombre_entrega" name="nombre_entrega" onChange={handleChange} />
            </div>
            <div class="col-md-5">
              <label className="form-label" for='paterno_entrega' >APELLIDO PATERNO DEL PROPIETARIO / REPRESENTANTE:</label>
              <input type="text" className="form-control" id="paterno_entrega" name="paterno_entrega" onChange={handleChange} />
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
