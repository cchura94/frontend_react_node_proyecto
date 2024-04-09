import api from './Api'

const categoriaService = {

    listar: () => {
        return api.get("/categoria");
    },
    mostrar: (id) => {
        return api.get('/categoria/'+id);
    },
    guardar: (datos) => {
        return api.post('/categoria', datos);
    },
    modificar: (id, datos) => {
        return api.put('/categoria/'+id, datos);
    },

    eliminar: (id) => {
        return api.delete('/categoria/'+id);
    },

}

export default categoriaService;