const connection = require('./connection');

const insertProduct = async (body) => {
    const { id_produto, id_cliente, quantidade } = body;

    await connection.execute(`
    INSERT INTO Carrinho (id_cliente, id_produto, quantidade) 
    VALUES ('${id_cliente}', '${id_produto}', '${quantidade}')
    ON DUPLICATE KEY UPDATE quantidade = ${quantidade} + 1;
    `);
};

const getItens = async (id) => {
    const [ query ] = await connection.execute(
        `SELECT Carrinho.id_produto, Carrinho.quantidade, Produto.preco, Produto.nome
        FROM Carrinho JOIN Produto
        ON Carrinho.id_produto = Produto.id_produto
        WHERE Carrinho.id_cliente = '${id}';`
    );

    return query;
};

const UptadeShoppingCar = async (itens) => {
    const { id_cliente, id_produto, quantidade } = itens;

    await connection.execute(`
    UPDATE Carrinho
    SET quantidade = ${quantidade}
    WHERE id_cliente = ${id_cliente} AND id_produto = ${id_produto};`
    );
};

const RemoveShoppingCar = async (itens) => {
    const { id_cliente, id_produto } = itens;

    await connection.execute(`
    DELETE from Carrinho
    WHERE id_cliente = ${id_cliente} AND id_produto = ${id_produto};`
    );
};

module.exports = {
    insertProduct, 
    getItens,
    UptadeShoppingCar,
    RemoveShoppingCar
}