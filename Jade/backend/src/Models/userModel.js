const connection = require('./connection');

const createUser = async (Data) => {
    const { nome, email, senha, telefone, data_nascimento, cpf } = Data;
    
    try {
        const query = await connection.execute(`INSERT INTO Cliente (nome, email, senha, telefone, data_nascimento, cpf) VALUES ('${nome}', '${email}', '${senha}', '${telefone}', '${data_nascimento}', '${cpf}');`);
        return query;
    }
    catch (error){
        console.error("Erro no bd", error);
    }
};

const getUser = async (email) => {
    const [ query ] = await connection.execute(`SELECT id_cliente FROM Cliente WHERE email='${email}';`);

    return query;
}

const getUserId = async (email) => {
    const [ query ] = await connection.execute(`SELECT id_cliente FROM Cliente WHERE email = '${email}'`);

    return query;
};

const getUserData = async (email) => {
    const [ query ] = await connection.execute(
        `SELECT id_cliente, nome, email, cpf, telefone, data_nascimento
        FROM Cliente WHERE email = '${email}';`
    );

    return query;
};

module.exports = {
    createUser,
    getUser,
    getUserId,
    getUserData
}