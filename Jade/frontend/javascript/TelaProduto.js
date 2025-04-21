// VARIÁVEIS
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('produto');
const divProduct = document.querySelector('.produto');
const seeMore = document.querySelector('.destaque');
const path = document.querySelector('.caminho');
const categorias = document.querySelectorAll('a.navbar-cat');

// FUNÇÕES
const getProduct = async (id) => {
    const product = { id: id };
    let produto = {};

    await fetch('http://localhost:3000/joia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        produto = data;
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return produto;
}

const getProducts = async (categoria) => {
    const item = categoria;
    const produtos = [];

    await fetch('http://localhost:3000/VejaMais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(produto => {
            produtos.push(produto);
        });
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return produtos;
}

const getCategoria = async (id) => {
    const item = { id: id };
    let categoria = {};

    await fetch('http://localhost:3000/Categoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        categoria = data;
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return categoria;
}

const getCliente = async (email) => {
    const user = { email: email };
    let cliente = {};

    await fetch('http://localhost:3000/user/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        cliente = data;
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return cliente;
};

const insertCar = async (idProduct, idCliente) => {
    const product = { id_produto: idProduct, id_cliente: idCliente, quantidade: 1 };

    await fetch('http://localhost:3000/ShoppingCar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensagem);
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

};

const createElement = (tag, innertext = '', attributes = {}) => {
    const element = document.createElement(tag);
    element.innerText = innertext;

    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }

    return element;
};

const showProduct = (Product, name) => {
    const { id_produto,  nome, descricao, quantidade_em_estoque, id_categoria, preco } = Product;

    const img = createElement('img', '', { src: `../fotos/produtos/${nome.replace(/\s/g, '')}.jpg` });
    const div = createElement('div', '', { class: 'detalhes-produto' });
    const h1 = createElement('h1', nome);
    const h3 = createElement('h3', `R$ ${preco.toFixed(2)}`);
    const button = createElement('button', '', { class: 'add-carrinho' });
    const span = createElement('span', 'Adicionar Ao Carrinho');
    const i = createElement('i', '', { class: 'fas fa-shopping-cart' });
    
    div.appendChild(h1);
    div.appendChild(h3);
    div.appendChild(button);
    button.appendChild(span);
    button.appendChild(i);
    divProduct.appendChild(img);
    divProduct.appendChild(div);
    
    const a1 = createElement('a', name.nome, { href: `Telacategoriabrincos.html?categoria=${encodeURIComponent(id_categoria)}` });
    const productName = document.createTextNode(` > ${nome}`);

    path.appendChild(a1);
    path.appendChild(productName);

    return { categoria: id_categoria, nome: nome };
};

const createSeeMore = (Products) => {
    const divElement1 = createElement('div');
    divElement1.classList.add('elementos');

        for (let i = 0; i < Products.length && i < 4; i++) {
            const { id_produto,  nome, descricao, quantidade_em_estoque, id_categoria, preco } = Products[i];

            const div = createElement('div');
            const a = createElement('a', '', { href: `Telaproduto1.html?produto=${encodeURIComponent(id_produto)}` });
            const img = createElement('img', '', { src: `../fotos/Produtos/${nome.replace(/\s/g, '')}.jpg` });
            const p1 = createElement('p', nome);
            const p2 = createElement('p', `R$ ${preco.toFixed(2)}`);

            div.classList.add('joias');

            div.appendChild(a);
            a.appendChild(img);
            a.appendChild(p1);
            a.appendChild(p2);

            divElement1.appendChild(div);
            
        };

    seeMore.appendChild(divElement1);

};

const addProductShoppingCar = async (idProduct) => {

};

const isLogged = (num) => {
    const perfil = document.getElementById('perfil');

    if (num){
        perfil.href = 'Telaperfil.html';
    }
    else {
        perfil.href = 'Teladelogin.html';
    }
};

const removespecialcharacters = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

const getCategoriaId = async (categoria) => {
    const item = { nome: categoria };
    let Idcategoria = 0;

    await fetch('http://localhost:3000/CategoriaId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        Idcategoria = data.id_categoria;
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return Idcategoria;
};

// EVENTOS
window.addEventListener('load', async () => {
    const Product = await getProduct(id);
    const name = await getCategoria(id);
    const categoria = showProduct(Product, name);

    const Products = await getProducts(categoria);
    createSeeMore(Products);

    if (localStorage.getItem('token')) {
        isLogged(true);
    }
    else {
        isLogged(false);
    }

    const buttonAddShoppingCar = document.querySelector('.add-carrinho');
    
    buttonAddShoppingCar.addEventListener('click', async () => {
        if (localStorage.getItem('token')) {
            const idCliente = await getCliente(localStorage.getItem('token'));
            await insertCar(id, idCliente.id_cliente);
        }
        else {
            alert('crie uma conta para adicionar itens no carrinho');
        }
    });

});

categorias.forEach(function(categoria) {
    categoria.addEventListener('click', async function(e) {
        e.preventDefault();
        var conteudoHTML = this.innerHTML;
        conteudoHTML = removespecialcharacters(conteudoHTML);
        if (conteudoHTML === 'Aneis'){
            console.log('true');
        }
        const idcategoria = await getCategoriaId(conteudoHTML);
        window.location.href = `Telacategoriabrincos.html?categoria=${encodeURIComponent(idcategoria)}`;
    });
});