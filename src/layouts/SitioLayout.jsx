import { NavLink, Outlet } from "react-router-dom";

const SitioLayout = () => {

    return (
        <>
            <div>
                <NavLink to="/">INICIO</NavLink> |
                <NavLink to="/login">INGRESAR</NavLink> |
                <NavLink to="/registro">REGISTRO</NavLink> 
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default SitioLayout;