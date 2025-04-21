const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');

const createUser = async (request, response) => {
    const Data = request.body;
    Data.senha = await bcrypt.hash(Data.senha, 10);

    const [ query ] = await userModel.createUser(Data);

    if (query.length !== 0){
        return response.status(201).json({ mensagem: 'Cadastro Concluído' });
    }

    return response.status(404).json({ mensagem: 'Error ao cadastrar no Banco de dados' });
}

const getUser = async (request, response) => {
    const { email } = request.body;

    const [ query ] = await userModel.getUser(email);

    return response.status(200).json(query);

};

const getUserId = async (request, response) => {
    const { email } = request.body;

    const [ query ] = await userModel.getUserId(email);
    
    return response.status(200).json(query);
};

const getUserData = async (request, response) => {
    const { email } = request.body;

    const [ query ] = await userModel.getUserData(email);

    return response.status(200).json(query);
};

module.exports = {
    createUser,
    getUser,
    getUserId,
    getUserData
}