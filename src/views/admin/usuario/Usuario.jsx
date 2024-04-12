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
            <h1>Nuevo Usuario</h1>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600 text-sm font-sm font-medium mb-2">Usuario</label>
                <input type="text" id="name" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 text-sm font-sm font-medium mb-2">Ingrese Correo</label>
                <input type="email" id="email" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
            </div>

            <div className="mb-4">
                <label htmlFor="pass" className="block text-gray-600 text-sm font-sm font-medium mb-2">Ingrese Contraseña</label>
                <input type="password" id="pass" className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
            </div>
            
        </Modal>
    </>

}

export default Usuario;