import { useEffect } from "react";
import categoriaService from "../../../services/categoria.service";
import { useState } from "react";
import Swal from 'sweetalert2'

const Categoria = () => {

    const [modalOpen, setModalOpen] = useState(false)
    const categoriaBlank = { nombre: "", detalle: "" }
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState(categoriaBlank);

    useEffect(() => {
        getCategorias()
    }, [])

    const getCategorias = async () => {
        const { data } = await categoriaService.listar()
        setCategorias(data);
    }

    const guardarCategoria = async (e) => {
        e.preventDefault();

        try {
            if (categoria.id) {
                const { data } = await categoriaService.modificar(categoria.id, categoria)

                Swal.fire({
                    title: 'Categoria actualizada!',
                    text: 'Ok para continuar',
                    icon: 'success',
                    confirmButtonText: 'ok'
                  })
                  setModalOpen(false)
                setCategoria(categoriaBlank)
                getCategorias()
            } else {
                const { data } = await categoriaService.guardar(categoria)

                Swal.fire({
                    title: 'Categoria registrada!',
                    text: 'Ok para continuar',
                    icon: 'success',
                    confirmButtonText: 'ok'
                  })

                  setModalOpen(false)
                setCategoria(categoriaBlank)
                getCategorias()
            }
        } catch (error) {
            alert("Ocurrió un error al registra la categoria");
        }
    }

    const editar = async (cat) => {
        setCategoria(cat)
        setModalOpen(true);
    }

    const funEliminar = async (cat) => {
        if (confirm("¿Está seguro de eliminar la categoria?")) {
            await categoriaService.eliminar(cat.id);
            getCategorias()
        }
    }

    const nuevaCategoria = () => {
        setCategoria(categoriaBlank);
        setModalOpen(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria((prevState => ({
            ...prevState,
            [name]: value
        })))
    }

    return <>
        <h1>Lista de Categorias</h1>

        {modalOpen &&
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50"></div>

                <div className="bg-white rounded-lg p-6 w-2/3 md:w-1/3 xl:w-1/3 relative">
                    <form onSubmit={(e) => guardarCategoria(e)}>
                        <div className="mb-4">
                            <label htmlFor="nom" className="block text-gray-600 text-sm font-medium mb-2">Ingrese Nombre</label>
                            <input type="text" id="nom" value={categoria.nombre} name="nombre" onChange={handleChange} required className="w-full px-3 py-2 border-gray-300 rounded-md outline focus:outline-none focus:border-blue-500" />

                        </div>

                        <label htmlFor="" className="block text-gray-600 text-sm font-medium mb-2">Ingrese Detalle</label>
                        <input type="text" value={categoria.detalle} name="detalle" onChange={handleChange} className="w-full px-3 py-2 border-gray-300 rounded-md outline focus:outline-none focus:border-blue-500" />
                        <button type="submit" className="bg-blue-300 hover:bg-blue-400 py-2 px-4 rounded" >Guardar Categoria</button>
                    </form>

                    <button className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded absolute top-0 right-0 mr-4 mt-4" onClick={() => setModalOpen(false)}>X</button>
                </div>

            </div>
        }

        <button className="bg-blue-300 hover:bg-blue-400 py-2 px-4 rounded" onClick={() => nuevaCategoria()}>Nueva Categoria</button>

        <table className="bg-white min-w-full">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">NOMBRE</th>
                    <th className="py-2 px-4 border-b">DETALLE</th>
                    <th className="py-2 px-4 border-b">ACCION</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map((cat) => (
                    <tr key={cat.id}>
                        <td className="py-2 px-4 border-b">{cat.id}</td>
                        <td className="py-2 px-4 border-b">{cat.nombre}</td>
                        <td className="py-2 px-4 border-b">{cat.detalle}</td>
                        <td className="py-2 px-4 border-b">
                            <button onClick={() => editar(cat)} className="bg-yellow-600 hover:bg-yellow-400 px-1 py-1 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>

                            </button>
                            <button onClick={() => funEliminar(cat)} className="bg-red-600 hover:bg-red-400 px-1 py-1 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {/* JSON.stringify(categorias) */}
    </>

}

export default Categoria;