const produtosModel = require('../Models/produtosModel');

const getALL = async (request, response) => {
    const { nome } = request.body;

    const [ res ] = await produtosModel.getALL(nome);

    return response.status(200).json(res);
};

const getProductId = async (request, response) => {    
    const { nome } = request.body;

    const [ query ] = await produtosModel.getProductId(nome);

    return response.status(200).json(query);
};

module.exports = {
    getALL,
    getProductId
};