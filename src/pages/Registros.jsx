import React, { useState } from 'react';
import Tabla from '../components/Tabla';
import obtenerFirestore from '../firebase.database';
import { setDoc, doc, getDocs, collection, updateDoc } from "firebase/firestore";
import uuid from 'react-uuid';
import Swal from 'sweetalert2'

// Operaciones de la base de datos
const setDatos = async (data, db) => {
  await setDoc(doc(db, "contacto", data.id), data);

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Agregado correctamente',
    showConfirmButton: false,
    timer: 1500
  })
}


const getDatos = (db, set) => {
  getDocs(collection(db, "contacto")).then((querySnapshot) => {
    var datosTemporales = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      datosTemporales = [...datosTemporales, doc.data()]
    });
    set(datosTemporales)
  })
}




const updateDatos = async (db, datos) => {
  const referencia = doc(db, "contacto", datos.id);
  await updateDoc(referencia, datos);
}




const Registros = () => {
  const db = obtenerFirestore();
  const [nombre, setNombre] = useState()
  const [telefono, setTelefono] = useState()
  const [correo, setCorreo] = useState()
  const [direccion, setDireccion] = useState()
  const [datos, setDatosL] = useState()
  const [editar, setEditar] = useState(false)
  const [Id, setId] = useState()

  const cambiarDatos = (datos) => {
    setNombre(datos.nombre)
    setTelefono(datos.telefono)
    setCorreo(datos.correo)
    setDireccion(datos.direccion)
    setId(datos.id)
    setEditar(true)
  }

  const leer = () => {
    getDatos(db, setDatosL)
  }


  const agregar = (e) => {
    e.preventDefault();
    if (editar) {
      const datost = {
        id: Id,
        nombre: nombre,
        telefono: telefono,
        correo: correo,
        direccion: direccion
      }
      updateDatos(db, datost)
      setEditar(false)
    } else {
      const datost = {
        id: uuid(),
        nombre: nombre,
        telefono: telefono,
        correo: correo,
        direccion: direccion
      }

      setDatos(datost, db);
    }

    setNombre('')
    setTelefono('')
    setCorreo('')
    setDireccion('')
    setId('')
    leer()
  }







  return (
    <div className='d-flex flex-wrap'>

      <h1 className='col-12 text-light bg-dark p-2 text-center' >Registro de contacto</h1>

      <form className='col-2 mt-2 ms-2 bg-secondary ps-1 pt-1 pb-1' onSubmit={agregar}>
        <h2>Formulario</h2>
        <input required value={nombre} type="text" placeholder='Nombre completo' className='col-11 ms-1  mb-1' onChange={(e) => setNombre(e.target.value)} />
        <input required value={telefono} type="number" placeholder='Telefono' className='col-11 ms-1  mb-1' onChange={(e) => setTelefono(e.target.value)} />
        <input required value={correo} type="email" placeholder='Correo electronico' className='col-11 ms-1  mb-1' onChange={(e) => setCorreo(e.target.value)} />
        <textarea required value={direccion} placeholder='Direccion' className='col-11 ms-1  mb-1' onChange={(e) => setDireccion(e.target.value)} />
        {editar ?
          <button type="submit" className=" col-11 ms-1 mb-1 btn btn-outline-light">Editar</button> :
          <button type="submit" className=" col-11 ms-1 mb-1 btn btn-outline-light">Guardar</button>}
      </form>

      <div className='col-1'></div>

      {!datos ? (
        <button type="button" onClick={leer} className="col-8 btn btn-light">Actualizar</button>
      ) : (
        <Tabla datos={datos} db={db} leer={leer} cambiar={cambiarDatos} />
      )}
    </div>
  )
}

export default Registros