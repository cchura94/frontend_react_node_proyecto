import api from './Api'

const authService = {

    loginConNode: (credenciales) => {
        return api.post("/auth/login", credenciales);
    },
    registerConNode: (datos) => {
        return api.post('/auth/register', datos);
    }

}

export default authService;