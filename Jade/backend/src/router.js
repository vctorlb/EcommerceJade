const express = require('express');
const joiaController = require('./Controllers/joiaController');
const loginController = require('./Controllers/loginController');
const produtosController = require('./Controllers/produtosController');
const userController = require('./Controllers/userController');
const seeMoreController = require('./Controllers/seeMoreController');
const categoriaController = require('./Controllers/categoriaController');
const shoppingCarController = require('./Controllers/shoppingCarController');
const perfilController = require('./Controllers/perfilController');
const finalizarPedidoController = require('./Controllers/finalizarPedidoController');

const loginMiddleware = require('./Middlewares/loginMiddleware');

const router = express.Router();

router.post('/joia', joiaController.getJoia);
router.post('/Produtos', produtosController.getALL);
router.post('/VejaMais', seeMoreController.getProducts);
router.post('/login', loginMiddleware.validarLogin, loginController.autenticaterUser);
router.post('/user', userController.createUser);
router.post('/user/email', userController.getUser);
router.post('/userId', userController.getUserId);
router.post('/getUser', userController.getUserData);
router.post('/Categoria', categoriaController.getCategoriaName);
router.post('/CategoriaProdutos', categoriaController.getCategoria);
router.post('/CategoriaName', categoriaController.getNameCategoria);
router.post('/CategoriaId', categoriaController.getCategoriaId);
router.post('/ShoppingCar', shoppingCarController.insertProduct);
router.post('/ShoppingCarItens', shoppingCarController.getItens);
router.put('/ShoppingCarUpdate', shoppingCarController.UptadeShoppingCar);
router.delete('/ShoppingCarRemove', shoppingCarController.RemoveShoppingCar);
router.post('/ProductId', produtosController.getProductId);
router.put('/perfilUpdate', perfilController.UpdatePerfil);
router.post('/finalizarPedidogc', finalizarPedidoController.getCartao);
router.post('/finalizarPedidoic', finalizarPedidoController.insertCartao);
router.post('/finalizarPedidoge', finalizarPedidoController.getEndereco);
router.post('/finalizarPedidoie',finalizarPedidoController.insertEndereco);

module.exports = router;