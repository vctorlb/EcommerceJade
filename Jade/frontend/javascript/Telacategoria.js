// VARIÁVEIS
const urlParams = new URLSearchParams(window.location.search);
const idCategoria = urlParams.get('categoria');
const categorias = document.querySelectorAll('a.navbar-cat');
const path = document.querySelector('.caminho');
const divElement = document.querySelector('.elementos');

// FUNÇÕES
const removespecialcharacters = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

const createElement = (tag, innertext = '', attributes = {}) => {
    const element = document.createElement(tag);
    element.innerText = innertext;

    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }

    return element;
};

const showProduct = (Product) => {
    const { id_produto,  nome, descricao, quantidade_em_estoque, id_categoria, preco } = Product;

    const div = createElement('div', '', { class: 'joias' });
    const a = createElement('a', '',{ href: `Telaproduto1.html?produto=${encodeURIComponent(id_produto)}` });
    const img = createElement('img', '', { src: `../fotos/produtos/${nome.replace(/\s/g, '')}.jpg` });
    const p = createElement('p', nome);
    const br = createElement('br');
    const Productpreco = document.createTextNode(`R$ ${preco.toFixed(2)}`);

    div.appendChild(a);
    a.appendChild(img);
    a.appendChild(p);
    p.appendChild(br);
    p.appendChild(Productpreco);
    divElement.appendChild(div);

};

const getProducts = async (categoria) => {
    const item = { nome: categoria };
    const produtos = [];

    await fetch('http://localhost:3000/CategoriaProdutos', {
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

const getNameCategoria = async (id) => {
    const item = { id: id };
    let categoria = {};

    await fetch('http://localhost:3000/CategoriaName', {
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
};

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

const isLogged = (num) => {
    const perfil = document.getElementById('perfil');

    if (num){
        perfil.href = 'Telaperfil.html';
    }
    else {
        perfil.href = 'Teladelogin.html';
    }
};

// EVENTOS
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

window.addEventListener('load', async () => {
    if (localStorage.getItem('token')) {
        isLogged(true);
    }
    else {
        isLogged(false);
    }
    
    const nameCategoria = await getNameCategoria(idCategoria);
    const Products = await getProducts(nameCategoria.nome);
    
    Products.forEach(Product => {
        showProduct(Product);
    });

    const a1 = createElement('a', nameCategoria.nome, { href: `Telacategoriabrincos.html?categoria=${encodeURIComponent(idCategoria)}` });
    path.appendChild(a1);
});