import { useEffect } from "react";
import categoriaService from "../../../services/categoria.service";
import { useState } from "react";

const Categoria = () => {

    const [modalOpen, setModalOpen] = useState(true)
    const categoriaBlank = {nombre: "", detalle: ""}
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
            if(categoria.id){
                const { data } = await categoriaService.modificar(categoria.id, categoria)
                setCategoria(categoriaBlank)
                getCategorias()
            }else{
                const { data } = await categoriaService.guardar(categoria)
                setCategoria(categoriaBlank)
                getCategorias()
            }
        } catch (error) {
            alert("Ocurrió un error al registra la categoria");
        }
    }

    const editar = async (cat) => {
        setCategoria(cat)
    }

    const funEliminar = async (cat) => {
        if(confirm("¿Está seguro de eliminar la categoria?")){
            await categoriaService.eliminar(cat.id);
            getCategorias()
        }
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

<button className="bg-blue-300 hover:bg-blue-400 py-2 px-4 rounded" onClick={() => setModalOpen(true)}>Nueva Categoria</button>

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
                            <button onClick={() => editar(cat)}>editar</button>
                            <button onClick={() => funEliminar(cat)}>eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {/* JSON.stringify(categorias) */}
    </>

}

export default Categoria;