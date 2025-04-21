const connection = require('./connection');

const getJoia = async (joia) => {
    const { id } = joia;
    const [joias] = await connection.execute(`SELECT * FROM Produto WHERE id_produto='${id}'`);
    return joias;
};

module.exports = {
    getJoia
};