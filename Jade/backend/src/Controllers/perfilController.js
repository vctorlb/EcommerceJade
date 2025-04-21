const perfilModel = require('../Models/perfilModel')

const UpdatePerfil = async (request, response) => {
    const perfil = request.body;

    await perfilModel.UpdatePerfil(perfil);

    return response.status(200).json({ mensagem: 'perfil atualizado com sucesso' });

};

module.exports = {
    UpdatePerfil
};