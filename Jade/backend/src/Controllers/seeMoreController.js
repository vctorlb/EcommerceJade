const seeMoreModel = require('../Models/seeMoreModel');

const getProducts = async (request, response) => {
    const { categoria, nome } = request.body;

    const [ query ] = await seeMoreModel.getProducts(categoria, nome);

    return response.status(200).json(query);

};

module.exports = {
    getProducts
}