import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {

    return (
        <>
            <div>
                <NavLink to="/admin/perfil">Pefil</NavLink> |
                <NavLink to="/admin/usuario">Usuarios</NavLink> |
                <NavLink to="/admin/categoria">Categoria</NavLink>
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default AdminLayout;