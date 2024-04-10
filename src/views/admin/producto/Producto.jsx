import { useEffect, useState } from "react";
import TablePagination from "../../../components/TablePagination";
import productoService from "../../../services/producto.service"
import Modal from "../../../components/Modal";

const Producto = () => {

    const columnas = [
        {key: "id", label: "COD"},
        {key: "nombre", label: "NOMBRE"},
        {key: "precio", label: "PRECIO"},
        {key: "stock", label: "STOCK"},
        {key: "accion", label: "ACCION"},
    ] 
    const [ productos, setProductos ] = useState([]);
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

        <button className="bg-blue-300 hover:bg-blue-400 py-2 px-4 rounded" onClick={() => setOpenModal(true)}>Nuevo Producto</button>

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