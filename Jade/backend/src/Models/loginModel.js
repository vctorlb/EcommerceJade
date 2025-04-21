const connection = require('./connection');

const find = async (inputUser) => {
    const { user } = inputUser;

    const [ query ] = await connection.execute(`SELECT email, senha FROM Cliente WHERE email="${user}"`);
    return query;
}

module.exports = {
    find
};