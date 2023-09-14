import Navbar from "./Navbar";

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import "../archivosCss/formulario.css"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const MasD = () => {


  /* 
  const [val_bd, setVal_bd] = useState([])
  const [select, setSelect]=useState([])
  
  
  
   useEffect (()=>{
   fetch("http://localhost:8081/traerPais")
   .then((data)=>data.json())
   .then((val)=>setVal_bd(val))
   

  },[])
  console.log (val_bd,"values", select)
   */

  const [create, setUser] = useState({
    averiguacion: "",
    fecha_averigua: "",
    agencia_mp: "",


  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    //setUser.id_pais = setSelect((prev)=>({ ...prev, [e.target.name]: e.target.value}));

  };

  console.log(create)

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/crear", create);
      console.log(setUser)
      alert("El nuevo registro ha sido guardado correctamente ")
      navigate("/")

    } catch (err) {
      console.log(err)
    }
  }


  return (

    <>
      <Navbar></Navbar>
      <div className="area_form">
        <div className="contenedor">
          <Form>

            <h3>Registro de Vehiculo Robado</h3>



            <div className="mb-3 mt-3">
              <label className="form-label" > Averiguacion:</label>
              <input type="text" className="form-control" id="averiguacion" name="averiguacion" onChange={handleChange} />
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label" > fecha averiguacion:</label>
              <input type="text" className="form-control" id="fecha_averigua" name="fecha_averigua" onChange={handleChange} />
            </div>

            <div className="mb-3 mt-3">
              <label className="form-label" >agencia</label>
              <input type="text" className="form-control" id="agencia_mp" name="agencia_mp" onChange={handleChange} />
            </div>

            { /*  
                  <div className="mb-3 mt-3" >
                     <select name="id_pais"  className="form-control form-select" onChange={handleChange}>
                            <option>Seleciona un pais</option>
                        {
                           val_bd.map((opts,i)=> 
                           <option value={opts.id} key={i}>{opts.paises}</option> )
                          
                        }
                        
                        </select>                    
                          </div>

                     */   }
            {/* 
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>NÚMERO DE AVERIGUACION PREVIA ASIGNADA</Form.Label>
          <Form.Control type="text" name="averiguacion" placeholder="aver" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>FECHA EN QUE SE DIO DE ALTA LA DENUNCIA</Form.Label>
          <Form.Control type="text" name="fecha_averigua" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>AGENCIA DEL MINISTERIO PÚBLICO DONDE SE HIZO LA DENUNCIA</Form.Label>
          <Form.Control type="text" name="agencia_mp" placeholder="" onChange={handleChange}/>
        </Form.Group>
         
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>NOMBRE COMPLETO DEL AGENTE DEL MINISTERIO PÚBLICO QUE LEVANTO LA DENUNCIA</Form.Label>
          <Form.Control type="text" name="agente_mp" placeholder=""onChange={handleChange} />
        </Form.Group>     
      </Row>*/}

            {  /*          
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridState">
          <Form.Label>MODALIDAD DEL ROBO</Form.Label>
          <Form.Select defaultValue="Choose..." type="text" name="" placeholder="" onChange={handleChange}>
            <option>0.-SIN INFORMACION</option>
            <option>1.-CON VIOLENCIA</option>
            <option>2.-SIN VIOLENCIA</option>
          </Form.Select >
        </Form.Group >

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>FECHA DEL ROBO</Form.Label>
          <Form.Control type="text" name="fecha_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>        

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>HORA DEL ROBO</Form.Label>
          <Form.Control type="text" name="hora_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>

      
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>CALLE DONDE OCURRIO EL ROBO</Form.Label>
          <Form.Control type="text" name="calle_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>NUMERO EXTERIOR DEL DOMICILIO DONDE OCURRIÓ EL ROBO</Form.Label>
          <Form.Control type="text" name="num_ext_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>
       
                
     <Row className="mb-3">
     <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>COLONIA DONDE OCURRIO EL ROBO</Form.Label>
          <Form.Control type="text" name="colonia_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>   

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label> IDENTIFICADOR DEL MUNICIPIO DONDE OCURRIÓ EL ROBO</Form.Label>
          <Form.Control type="text" name="id_municipio_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>        

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>IDENTIFICADOR DE LA ENTIDAD DÓNDE OCURRIÓ EL ROBO</Form.Label>
          <Form.Control type="text" name="id_entidad_robo" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>


        
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>TIPO DEL LUGAR DONDE OCURRIÓ EL ROBO</Form.Label>
          <Form.Control type="text" name="id_tipo_lugar" placeholder="centro comercial, casa, etc. " onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>NOMBRE DE LA PERSONA QUE REALIZA LA DENUNCIA</Form.Label>
          <Form.Control type="text" name="nombre_den" placeholder=""onChange={handleChange} />
        </Form.Group>
      </Row>


      
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>APELLIDO PATERNO DE LA PERSONA QUE REALIZA LA DENUNCIA</Form.Label>
          <Form.Control type="text" name="paterno_den" placeholder="" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>CALLE DEL DOMICILIO DEL DENUNCIANTE</Form.Label>
          <Form.Control type="text" name="calle_den" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>

             

      <Row className="mb-3">
     <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>NÚMERO EXTERIOR DEL DOMICILIO DEL DENUNCIANTE</Form.Label>
          <Form.Control type="text" name="numext_dom_den" placeholder=""onChange={handleChange}/>
        </Form.Group>   

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>COLONIA DEL DOMICILIO DEL DENUNCIANTE </Form.Label>
          <Form.Control type="text" name="colonia_den" placeholder="" onChange={handleChange}/>
        </Form.Group>        

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>IDENTIFICADOR DEL DOMICILIO DEL DENUNCIANTE</Form.Label>
          <Form.Control type="text" name="id_municipio_den" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>



       
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>IDENTIFICADOR DE LA ENTIDAD DÓNDE OCURIIÓ EL ROBO</Form.Label>
          <Form.Control type="text" name="id_entidad_den" placeholder="" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>CÓDIGO POSTAL DEL LUGAR DEL ROBO</Form.Label>
          <Form.Control type="text" name="cp_den" placeholder="" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>PLACA O PERMISO DEL VEHÍCULO</Form.Label>
          <Form.Control type="text" name="placa" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>


 
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>IDENTIFICADOR DE LA MARCA DEL VEHÍCULO</Form.Label>
          <Form.Control type="text" name="id_marca" placeholder="" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>IDENTIFICADOR DE LA SUBMARCA DEL VEHÍCULO</Form.Label>
          <Form.Control type="text" name="id_submarca" placeholder="" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>AÑO DEL MODELO DEL VEHÍCULO EN CUATRO DÍGITOS</Form.Label>
          <Form.Control type="text" name="modelo" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>



            
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>IDENTIFICADOR DEL COLOR DEL VEHÍCULO ROBADO</Form.Label>
          <Form.Control type="text" name="id_color" placeholder=""onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>NO. DE SERIE O NÚMERO DE IDENTIFICACIÓN DEL VEHÍCULO VIN</Form.Label>
          <Form.Control type="text" name="serie" placeholder=""onChange={handleChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>CLAVE DEL TIPO DE USO DEL VEHÍCULO</Form.Label>
          <Form.Control type="text" name="id_tipo_uso" placeholder="" onChange={handleChange}/>
        </Form.Group>
      </Row>


      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>IDENTIFICADOR DE LA PROCEDENCIA DEL VEHÍCULO (ARMADORA)</Form.Label>
        <Form.Control type="text" name="id_procedencia" placeholder="" onChange={handleChange}/>
      </Form.Group>
      */ }

            <Button variant="primary" type="submit" onClick={handleClick}>
              Submit
            </Button>
            <Link to="/" className="btn btn-info"> Inicio</Link>
          </Form>
        </div>
      </div>
    </>
  );
};

export default MasD;
