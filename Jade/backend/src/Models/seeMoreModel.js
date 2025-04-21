const connection = require('./connection');

const getProducts = async (categoria, nome) => {
    const query = connection.execute(`SELECT * FROM Produto WHERE id_categoria = '${categoria}' AND nome != '${nome}';`);

    return query;
};

module.exports = {
    getProducts
}