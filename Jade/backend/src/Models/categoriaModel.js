const connection = require('./connection');

const getCategoriaName = async (id) => {
    const [ query ] = await connection.execute(
        `SELECT Categoria.nome 
        FROM Produto JOIN Categoria 
        ON Produto.id_categoria = Categoria.id_categoria 
        WHERE Produto.id_produto = '${id}'`
    );

    return query;
};

const getCategoria = async(categoria) => {
    const query = await connection.execute(
        `SELECT Produto.id_produto, Produto.nome, Produto.descricao, Produto.quantidade_em_estoque, Produto.id_categoria, Produto.preco
        FROM Produto JOIN Categoria 
        ON Produto.id_categoria = Categoria.id_categoria
        WHERE Categoria.nome='${categoria}';`
    );

    return query;
}

const getNameCategoria = async (id) => {
    const [ query ] = await connection.execute(`SELECT nome FROM Categoria WHERE id_categoria = '${id}'`);

    return query;
}

const getCategoriaId = async (nome) => {
    const [ query ] = await connection.execute(`SELECT id_categoria FROM Categoria WHERE nome = '${nome}'`);

    return query;
}

module.exports = {
    getCategoriaName,
    getCategoria,
    getNameCategoria,
    getCategoriaId
}