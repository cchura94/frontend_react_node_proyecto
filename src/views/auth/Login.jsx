// importar servicios
import { useState } from "react";
import authService from "../../services/auth.service";

const Login = () => {

    // declarar variables
    // hooks
    const [email, asignarCorreo] = useState('juan@mail.com')
    const [password, setPassword] = useState('juan54321')
    // funciones
    async function funIngresar(){
        try {
            const {data} = await authService.loginConNode({email: email, password: password});
            console.log(data)
            alert("Logueando con Node...");
            
        } catch (error) {
            alert("Credenciales incorrectas...");
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold underline">Ingresar</h1>
            {email} - {password}
            <br />
          
                <label htmlFor="">Ingrese su Correo:</label>
                <input type="email" onChange={(e) => asignarCorreo(e.target.value)} />
                <br />
                <label htmlFor="">Ingrese su Contraseña</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button onClick={() => funIngresar()}>Ingresar</button>   
        </div>
    )
}

export default Login;