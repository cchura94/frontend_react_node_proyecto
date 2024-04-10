import AdminLayout from "../layouts/AdminLayouts";
import Categoria from "../views/admin/categoria/Categoria";
import Producto from "../views/admin/producto/Producto";
import Usuario from "../views/admin/usuario/Usuario";

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
            element: <Usuario></Usuario>
        },
        {
            path: 'categoria',
            element: <Categoria />
        },
        {
            path: 'producto',
            element: <Producto />
        }
    ]
}

export default AdminRoutes;