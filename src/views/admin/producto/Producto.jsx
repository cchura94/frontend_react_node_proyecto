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
    const [producto, setProducto] = useState({categoriaId:1, descripcion: "", estado:null, nombre: "", precio: "", stock:0});
    const [productos, setProductos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalShow, setOpenModalShow] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        funListar()
    }, [])

    const funListar = async (page=1, limit=3, q='') => {
        setPage(page)
        const { data } = await productoService.listar(page, limit, q)
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

        if(producto.id){
            await productoService.modificar(producto.id, producto);
        }else{
            await productoService.guardar(producto)

        }

        funListar();
        setOpenModal(false);
    }

    const editarModal = (datos) => {
        console.log(datos);
        setProducto(datos);
        setOpenModal(true);
    }

    const mostrarModal = (datos) => {
            console.log(datos)
        setProducto(datos);
        setOpenModalShow(true);
    }

    const nuevoProducto = () => {
        setProducto({});
        setOpenModal(true)
    }

    const eliminarProd = async (id) => {
        if(confirm("¿Está seguro de eliminar el producto?")){
            await productoService.eliminar(id)
            funListar()
            setProducto({})
        }
    }
    return <>
        <h1>Gestión Productos</h1>

        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => nuevoProducto()}>
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Nuevo Producto</span>
        </button>

       
        <TablePagination columns={columnas} data={productos} fetchData={funListar} total={total} page={page} handleEdit={editarModal} handleShow={mostrarModal} handleDelete={eliminarProd}>
           
        </TablePagination>

        <Modal modalOpen={openModal} setModalOpen={setOpenModal} >
            <h1>Form de Producto</h1>

<form onSubmit={(e) => guardarProducto(e)}>


<div className="mb-4">
    <label htmlFor="name" className="block text-gray-600 text-sm font-sm font-medium mb-2">Nombre</label>
    <input type="text" id="name"  name="nombre" onChange={handleChange} value={producto.nombre} className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
</div>

<div className="mb-4">
    <label htmlFor="pre" className="block text-gray-600 text-sm font-sm font-medium mb-2">Ingrese Precio</label>
    <input type="number" step="0.01" id="pre"  name="precio" onChange={handleChange} value={producto.precio} className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
</div>

<div className="mb-4">
    <label htmlFor="pass" className="block text-gray-600 text-sm font-sm font-medium mb-2">Stock</label>
    <input type="text" id="pass" name="stock" onChange={handleChange} value={producto.stock} className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
</div>
<div className="mb-4">
    <label htmlFor="desc" className="block text-gray-600 text-sm font-sm font-medium mb-2">Descripción</label>
    <input type="text" id="desc" name="descripcion" onChange={handleChange} value={producto.descripcion} className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
</div>

<div className="mb-4">
    <label htmlFor="cat_id" className="block text-gray-600 text-sm font-sm font-medium mb-2">Categoria</label>
    <input type="number" id="cat_id" name="categoriaId" onChange={handleChange} value={producto.categoriaId} className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
</div>


<input type="submit" value="Guardar" className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 text-white" />
</form>
        </Modal>

        <Modal modalOpen={openModalShow} setModalOpen={setOpenModalShow} >
            <h1>SHOW</h1>
        </Modal>
    </>

}

export default Producto;