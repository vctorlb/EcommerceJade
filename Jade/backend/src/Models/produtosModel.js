const connection = require('./connection');

const getALL = async (produto) => {
    const query = connection.execute(`SELECT * FROM Produto WHERE nome LIKE '%${produto}%';`);

    return query;
};
       
const getProductId = async (nome) => {
    const [ query ] = await connection.execute(`SELECT id_produto FROM Produto WHERE nome = '${nome}';`);
    console.log(query);
    return query;
};

module.exports = {
    getALL,
    getProductId
}