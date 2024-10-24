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
            localStorage.setItem("access_token", data.access_token)
            localStorage.setItem("userData", JSON.stringify(data.usuario))
            
        } catch (error) {
            alert("Credenciales incorrectas...");
        }
    }

    return (
        <>
        {/*
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
    */}

        <div className="w-full flex flex-wrap">

        <div className="w-full md:w-1/2 flex flex-col">

            <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                <a href="#" className="bg-black text-white font-bold text-xl p-4">EMPRESA</a>
            </div>

            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p className="text-center text-3xl">Bienvenido.</p>
               
                    <div className="flex flex-col pt-4">
                        <label for="email" className="text-lg">Correo</label>
                        <input type="email" id="email" onChange={(e) => asignarCorreo(e.target.value)} placeholder="your@email.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
    
                    <div className="flex flex-col pt-4">
                        <label for="password" className="text-lg">Password</label>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
    
                    <input type="submit" value="Ingresar" onClick={() => funIngresar()} className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
                
                <div className="text-center pt-12 pb-12">
                    <p>Don't have an account? <a href="register.html" className="underline font-semibold">Register here.</a></p>
                </div>
            </div>

        </div>
        <div className="w-1/2 shadow-2xl">
            <img className="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0" />
        </div>
    </div>

        </>
    )
}

export default Login;