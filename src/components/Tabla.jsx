import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'

const Tabla = ({ datos, db, leer, cambiar }) => {

    const eliminar = async (id) => {
        await deleteDoc(doc(db, "contacto", id));
        leer()
    }


    return (
        <div className='table-responsive-xl col-8'>
            <table className="table ">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Editar</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">correo</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Eliminar</th>

                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => {

                        console.log(dato)
                        return (
                            <tr key={dato.id}>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                    onClick={()=>cambiar(dato)}
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td>{dato.nombre}</td>
                                <td>{dato.telefono}</td>
                                <td>{dato.correo}</td>
                                <td>{dato.direccion}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => eliminar(dato.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table >
        </div>
    )
}

export default Tabla