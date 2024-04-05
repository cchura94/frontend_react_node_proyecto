import { useEffect } from "react";
import categoriaService from "../../../services/categoria.service";
import { useState } from "react";

const Categoria = () => {

    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState({});

    useEffect(() => {
        getCategorias()
    }, [])

    const getCategorias = async () => {
        const {data} = await categoriaService.listar()
        setCategorias(data);
    }

    const guardarCategoria = async () => {
        const {data} = await categoriaService.guardar({nombre: 'Prueba', detalle: 'prueba detalle'})
        
        getCategorias()
    }

    const editar = async (cat) => {

    }

    return <>
        <h1>Lista de Categorias</h1>

<label htmlFor="">Ingrese Nombre</label>
<input type="text" value="PRUEBA" />


<label htmlFor="">Ingrese Detalle</label>
<input type="text" value="detalle" />
<button onClick={() => guardarCategoria()}>Guardar Categoria</button>

        <table border={1}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>DETALLE</th>
                    <th>ACCION</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map((cat) => (
                    <tr>
                        <td>{cat.id}</td>
                        <td>{cat.nombre}</td>
                        <td>{cat.detalle}</td>
                        <td>
                            <button onClick={() => editar(cat)}>editar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {JSON.stringify(categorias)}
    </>

}

export default Categoria;