import AdminLayout from "../layouts/AdminLayouts";
import Categoria from "../views/admin/categoria/Categoria";

const AdminRoutes = {
    path: '/admin',
    element: <AdminLayout />,
    children: [
        {
            path: 'perfil',
            element: <h2>Mi Perfil</h2>
        },
        {
            path: 'usuario',
            element: <h2>Usuarios</h2>
        },
        {
            path: 'categoria',
            element: <Categoria />
        }
    ]
}

export default AdminRoutes;