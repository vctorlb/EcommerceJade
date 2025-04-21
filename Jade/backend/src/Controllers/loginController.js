const loginModel = require('../Models/loginModel');
const bcrypt = require('bcrypt');

const autenticaterUser = async (request, response) => {
    const [ user ] = await loginModel.find(request.body);

    if (user === undefined){
        return response.status(400).json({ mensagem: "Usuário não encontrado" });
    }

    try {
        const passwordMatch = await bcrypt.compare(request.body.senha, user.senha);

        if (passwordMatch) {
            return response.status(200).json({ mensagem: "Login realizado com sucesso" });
        }
        else {
            return response.status(400).json({ mensagem: "Senha incorreta" });
        }
    }
    catch (error) {
        console.error(error);
        return response.status(500).json({ mensagem: "Erro interno no Servidor" });
    }
    
};

module.exports = {
    autenticaterUser
};