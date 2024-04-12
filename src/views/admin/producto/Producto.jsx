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
    const [productos, setProductos] = useState([]);
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        funListar()
    }, [])

    const funListar = async () => {
        const { data } = await productoService.listar()
        setProductos(data.rows);
    }

    return <>
        <h1>Gestión Productos</h1>

        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => setOpenModal(true)}>
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">NuevoProducto</span>
        </button>

       
        <TablePagination columns={columnas} data={productos} handleEdit={true} handleShow={true} handleDelete={true}>
            <h1>CHILDREN</h1>
            <h2>Otro Children</h2>
        </TablePagination>

        <Modal modalOpen={openModal} setModalOpen={setOpenModal} >
            <h1>FOrm de Producto</h1>
        </Modal>
    </>

}

export default Producto;