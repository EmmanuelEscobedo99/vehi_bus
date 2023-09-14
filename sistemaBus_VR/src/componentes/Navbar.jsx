import { Link } from "react-router-dom"
import { NavLink } from 'react-router-dom'



const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              {/*<a className="nav-link active"  href="#"><Link to="/formulario">Alta de registro </Link></a>*/}

              {/*<a className="nav-link active"  href="#"><Link to="/">Busqueda de registros</Link>   </a>*/}


              {/*<a className="nav-link active"  href="#"><Link to="/recuperado">Entregado </Link></a>*/}

              {/*<a className="nav-link active"  href="#"><Link  to="/Login" >Cerrar sesion</Link>   </a>*/}


              <nav>

                <ul>
                  {/*<a className="logo" href="#">Registro </a>*/}
                  <div className="logo">
                    <span></span>
                    <h3>Regristro</h3>
                  </div>
                  <li>
                    <NavLink to="/alta" className={({isActive}) => isActive ? "active" : ""}>Registrar vehiculo</NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Buscar vehiculo</NavLink>
                  </li>
                  <li>
                    <NavLink to="/recuperado" className={({isActive}) => isActive ? "active" : ""}>Recuperar vehiculo</NavLink>
                  </li>
                  <li>
                    <NavLink to="/entregado" className={({isActive}) => isActive ? "active" : ""}>Entregar vehiculo</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Login" className={({isActive}) => isActive ? "active" : ""}>Cerrar sesion</NavLink>
                  </li>
                </ul>
              </nav>

            </div>
          </div>
        </div>
      </nav>

    </>




  )
}

export default Navbar