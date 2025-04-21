const ShoppingCarModel = require('../Models/shoppingCarModel');

const insertProduct = async (request, response) => {
    await ShoppingCarModel.insertProduct(request.body);

    return response.status(201).json({ mensagem: 'item adicionado no carrinho' });
};

const getItens = async (request, response) => {
    const { id } = request.body;
    
    const query = await ShoppingCarModel.getItens(id);

    return response.status(200).json(query);
};

const UptadeShoppingCar = async (request, response) => {
    await ShoppingCarModel.UptadeShoppingCar(request.body);

    return response.status(200).json({ mensagem: 'Carrinho atualizado com sucesso' });
}

const RemoveShoppingCar = async (request, response) => {
    await ShoppingCarModel.RemoveShoppingCar(request.body);

    return response.status(200).json({ mensagem: 'Item excluído do Carrinho com sucesso' });
}

module.exports = {
    insertProduct,
    getItens,
    UptadeShoppingCar,
    RemoveShoppingCar
}