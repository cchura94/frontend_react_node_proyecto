import SitioLayout from "../layouts/SitioLayout";
import Login from "../views/auth/Login";

const SitioRoutes = {
    path: '/',
    element: <SitioLayout />,
    children: [
        {
            path: 'login',
            element: <Login></Login>
        },
        {
            path: 'registro',
            element: <h2>Registro</h2>
        }
    ]
}

export default SitioRoutes;