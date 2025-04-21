const connection =  require('./connection');
const bcrypt = require('bcrypt');

const UpdatePerfil = async (perfil) => {
    const { id_cliente, nome, email, telefone, cpf, senha, data_nascimento } = perfil;

    await connection.execute(
        `UPDATE Cliente
        SET nome = IF(nome != '${nome}', '${nome}', nome),
        email = IF(email != '${email}', '${email}', email),
        telefone = IF(telefone != '${telefone}', '${telefone}', telefone),
        cpf = IF(cpf != '${cpf}', '${cpf}', cpf),
        senha = IF(senha != '' AND senha != '${senha}', '${await bcrypt.hash(senha, 10)}', senha),
        data_nascimento = IF(data_nascimento != '${data_nascimento}', '${data_nascimento}', data_nascimento)
        WHERE id_cliente = '${id_cliente}';`
    );
    
};

module.exports = {
    UpdatePerfil
};