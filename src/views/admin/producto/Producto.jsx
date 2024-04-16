import { useEffect, useState } from "react";
import TablePagination from "../../../components/TablePagination";
import productoService from "../../../services/producto.service"
import Modal from "../../../components/Modal";

const Producto = () => {

    const columnas = [
        { key: "id", label: "COD" },
        { key: "nombre", label: "NOMBRE" },
        { key: "precio", label: "PRECIO" },
        { key: "stock", label: "STOCK" },
        { key: "accion", label: "ACCION" },
    ]
    const [producto, setProducto] = useState({});
    const [productos, setProductos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        funListar()
    }, [])

    const funListar = async (page=1, limit=3) => {
        setPage(page)
        const { data } = await productoService.listar(page, limit)
        setProductos(data.rows);
        setTotal(data.count)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto((prevState => ({
            ...prevState,
            [name]: value
        })))
    }

    const guardarProducto = async (e) => {
        e.preventDefault();

        await productoService.guardar(producto)

        funListar();
        setOpenModal(false);
    }

    return <>
        <h1>Gestión Productos</h1>

        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => setOpenModal(true)}>
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">NuevoProducto</span>
        </button>

       
        <TablePagination columns={columnas} data={productos} fetchData={funListar} total={total} page={page} handleEdit={true} handleShow={true} handleDelete={true}>
           
        </TablePagination>

        <Modal modalOpen={openModal} setModalOpen={setOpenModal} >
            <h1>Form de Producto</h1>

<form onSubmit={(e) => guardarProducto(e)}>


<div className="mb-4">
    <label htmlFor="name" className="block text-gray-600 text-sm font-sm font-medium mb-2">Nombre</label>
    <input type="text" id="name"  name="nombre" onChange={handleChange} className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
</div>

<div className="mb-4">
    <label htmlFor="pre" className="block text-gray-600 text-sm font-sm font-medium mb-2">Ingrese Precio</label>
    <input type="number" step="0.01" id="pre"  name="precio" onChange={handleChange} className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
</div>

<div className="mb-4">
    <label htmlFor="pass" className="block text-gray-600 text-sm font-sm font-medium mb-2">Stock</label>
    <input type="text" id="pass" name="stock" onChange={handleChange} className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
</div>
<div className="mb-4">
    <label htmlFor="desc" className="block text-gray-600 text-sm font-sm font-medium mb-2">Descripción</label>
    <input type="text" id="desc" name="descripcion" onChange={handleChange} className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
</div>

<div className="mb-4">
    <label htmlFor="cat_id" className="block text-gray-600 text-sm font-sm font-medium mb-2">Categoria</label>
    <input type="number" id="cat_id" name="categoriaId" onChange={handleChange} className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
</div>


<input type="submit" value="Guardar" className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 text-white" />
</form>
        </Modal>
    </>

}

export default Producto;