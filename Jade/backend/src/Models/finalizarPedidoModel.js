const connection = require('./connection');

const insertEndereco = async(body) => {
    const { numero, rua, bairro, cep, complemento, estado, cidade, id_cliente } = body;
    try{
        await connection.execute(
            `INSERT INTO Endereco (numero, rua, bairro, cep, cidade, estado, complemento, id_cliente)
            VALUES ('${numero}', '${rua}', '${bairro}', '${cep}', '${cidade}', '${estado}', '${complemento}', '${id_cliente}');`)
    } catch{
        console.error("Erro no Banco de dados", error);
    };
};

const getEndereco = async(id) => {
    const [ query ] = await connection.execute(
        `SELECT * FROM Endereco
        WHERE id_cliente = '${id}';`
    );
    return query;
};

const insertCartao = async(body) => {
    const { numero_cartao, nome_titular, data_validade, cvv, id_cliente } = body;

    try{
        await connection.execute(`
            INSERT INTO Cartoes (numero_cartao, nome_titular, data_validade, cvv, id_cliente)
            VALUES ('${numero_cartao}', '${nome_titular}', '${data_validade}', '${cvv}', '${id_cliente}')
            ON DUPLICATE KEY UPDATE id_cartoes = LAST_INSERT_ID(id_cartoes + 1);
        `)
    } catch{
        console.error("Errono no banco de dados", error);
    };
};

const getCartao = async(id) => {
    const [ query ] = await connection.execute(
        `SELECT * FROM Cartoes
        WHERE id_cliente = '${id}';`
    );
    return query;
};
module.exports = {
    insertEndereco,
    getEndereco,
    insertCartao,
    getCartao
}