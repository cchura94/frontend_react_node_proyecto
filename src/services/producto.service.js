import api from './Api'

const productoService = {

    listar: (page=1, limit=10, q='') => {
        return api.get(`/producto?page=${page}&limit=${limit}&q=${q}`);
    },
    mostrar: (id) => {
        return api.get('/producto/'+id);
    },
    guardar: (datos) => {
        return api.post('/producto', datos);
    },
    modificar: (id, datos) => {
        return api.put('/producto/'+id, datos);
    },

    eliminar: (id) => {
        return api.delete('/producto/'+id);
    },

}

export default productoService;