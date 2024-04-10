import { useEffect, useState } from "react";
import TablePagination from "../../../components/TablePagination";
import usuarioService from "../../../services/usuario.service"
import Modal from "../../../components/Modal";

const Usuario = () => {

    const columnas = [
        { key: "id", label: "COD" },
        { key: "name", label: "NOMBRE" },
        { key: "email", label: "Correo Electronico" },
        { key: "createdAt", label: "Creado EN" },
        { key: "accion", label: "ACCION" },
    ]
    const [usuarios, setUsuarios] = useState([]);
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        funListar()
    }, [])

    const funListar = async () => {
        const { data } = await usuarioService.listar()
        setUsuarios(data);
    }


    return <>
        <h1>Gestión Usuarios</h1>

        <button className="bg-blue-300 hover:bg-blue-400 py-2 px-4 rounded" onClick={() => setOpenModal(true)}>Nuevo Usuario</button>
        <TablePagination columns={columnas} data={usuarios} handleShow={true}>
        </TablePagination>
        
        <Modal modalOpen={openModal} setModalOpen={setOpenModal} >
            <h1>FOrm de Producto</h1>
        </Modal>
    </>

}

export default Usuario;