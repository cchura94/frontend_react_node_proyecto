import api from './Api'

const usuarioService = {

    listar: (page=1, limit=10, q='') => {
        return api.get(`/user?page=${page}&limit=${limit}&q=${q}`);
    },
    mostrar: (id) => {
        return api.get('/user/'+id);
    },
    guardar: (datos) => {
        return api.post('/user', datos);
    },
    modificar: (id, datos) => {
        return api.put('/user/'+id, datos);
    },

    eliminar: (id) => {
        return api.delete('/producto/'+id);
    },

}

export default usuarioService;