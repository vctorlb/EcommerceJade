const categoriaModel = require('../Models/categoriaModel');

const getCategoriaName = async (request, response) => {
    const { id } = request.body;

    const [ query ] = await categoriaModel.getCategoriaName(id);

    return response.status(200).json(query);
};

const getCategoria = async (request, response) => {
    const { nome } = request.body;

    const [ query ] = await categoriaModel.getCategoria(nome);

    return response.status(200).json(query);
}

const getNameCategoria = async (request, response) => {
    const { id } = request.body;

    const [ query ] = await categoriaModel.getNameCategoria(id);

    return response.status(200).json(query);
};

const getCategoriaId = async (request, response) => {
    const { nome } = request.body;

    const [ query ] = await categoriaModel.getCategoriaId(nome);

    return response.status(200).json(query);
};

module.exports = {
    getCategoriaName,
    getCategoria,
    getNameCategoria,
    getCategoriaId    
}