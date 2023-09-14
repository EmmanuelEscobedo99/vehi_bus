import Navbar from "./Navbar"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "../archivosCss/estilo.css"

const ListaArchivos = () => {

  //users
  const [registros, setRegistros] = useState([]);
  //search
  const [busqueda, setBusqueda] = useState("")

  // metodo de filtrado
  const btn_busqueda = (e) => {
    setBusqueda(e.target.value)
    console.log(e.target.value)

  }

  // metodo de filtrado
  let results = []
  if (!busqueda) {
    results = registros
  } else {
    results = registros.filter((datos) =>
      datos.nombre.includes(busqueda.toLocaleLowerCase()) ||
      datos.apellido.includes(busqueda.toLocaleLowerCase())

    )
  }

  useEffect(() => {
    const buscarRegistros = async () => {
      try {
        const res = await axios.get("http://localhost:8081/registro");
        setRegistros(res.data)

      } catch (err) {
        console.log(err)
      }

    };
    buscarRegistros();

  }, []);






  return (
    <>
      <Navbar></Navbar>
      <div className="titulo">
        <h3>Registros</h3>
      </div>
      <div className="btn-busqueda">
        <input value={busqueda} onChange={btn_busqueda} type="text" placeholder="Busqueda" className="form-control"></input>
      </div>

      <div >
        <section>
          <div className="container">

            <div className="cards">
              {results.map((registros) => {
                return (
                  <div key={registros.id} className="card">
                    <h3>targeta {registros.id}</h3>

                    <p>{registros.nombre}</p>
                    <p>{registros.apellido}</p>
                    <p>{registros.edad}</p>
                    <p>
                      Presentacion de cada uno de los archivos de la base de datos.
                    </p>
                    <div>

                      <Link className="btn d-grid gap-2 col-6 mx-auto" to="/Detalles">Detalles</Link>
                    </div>

                  </div>)
              })}
            </div>
          </div>
        </section>
      </div>



    </>
  )
}

export default ListaArchivos