// VARIÁVEIS
const search = document.getElementById('txtBusca');
const main = document.querySelector('main');
const SearchedProducts = document.getElementById('Resultado-Pesquisa');
const NoResults = document.getElementById('No-Results');
const Highlights = document.querySelector('.destaque');
const Carousel = document.getElementById('img-carrosel');
const btnRigth = document.getElementById('carrossel-right');
const btnLeft = document.getElementById('carrossel-left');
const categorias = document.querySelectorAll('a.navbar-cat');

// FUNÇÕES
const getProducts = async (produto) => {
    const item = { nome: produto };
    const produtos = [];

    await fetch('http://localhost:3000/Produtos', {
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
};

const showProducts = (itens) => {

    SearchedProducts.innerHTML = '';
    const ul = createElement('ul', '', { class: 'Products' });
    ul.innerHTML = '';

    main.classList.add('Hide');
    
    if (itens.length !== 0) {
        itens.forEach(product => {
            const ElementProduct = createProduct(product);
            ul.appendChild(ElementProduct);
        });
        SearchedProducts.classList.remove('Hide');
        NoResults.classList.add('Hide');
        NoResults.classList.remove('sem-resultado');
    }
    else{
        SearchedProducts.classList.add('Hide');
        NoResults.classList.remove('Hide');
        NoResults.classList.add('sem-resultado');
    };
    
    SearchedProducts.appendChild(ul);
    console.log(ul);
};

const createElement = (tag, innertext = '', attributes = {}) => {
    const element = document.createElement(tag);
    element.innerText = innertext;

    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }

    return element;
};

const createProduct = (Product) => {
    const { id_produto,  nome, descricao, quantidade_em_estoque, id_cateegoria, preco } = Product;

    const li = createElement('li', '', { id: `${id_produto}` });
    const div = createElement('div', '', { class: 'joia' });
    const a = createElement('a', '', { href: `Telaproduto1.html?produto=${encodeURIComponent(nome)}` });
    const img = createElement('img', '', { src: `../fotos/produtos/${nome.replace(/\s/g, '')}.jpg` });
    const p1 = createElement('p', nome);
    const p2 = createElement('p', `R$ ${preco.toFixed(2)}`);

    li.appendChild(div);
    div.appendChild(a);
    a.appendChild(img);
    a.appendChild(p1);
    a.appendChild(p2);
    
    return li;
};

const createHighlights = (Products) => {
    const divElement1 = createElement('div');
    // const divElement2 = createElement('div');
    divElement1.classList.add('elementos');
    // divElement2.classList.add('elementos');

        for (let i = 0; i < Products.length && i < 8; i++) {
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

            // if (i < 4) {
            //     divElement1.appendChild(div);
            // }
            // else {
            //     divElement2.appendChild(div)
            // };
        };

    Highlights.appendChild(divElement1);
    // Highlights.appendChild(divElement2);

};

// const ImgCarousel = (img) => {

//     let num = Carousel.src;
//     num = num.split('/');
//     num = +num[num.length - 1].split('.')[0];
    
//     if (num + img < 1) {
//         Carousel.src = '../fotos/carrosel/7.jpg';
//     };
//     if (num + img > 7) {
//         Carousel.src = '../fotos/carrosel/1.jpg';
//     }
//     if (num + img >= 1 && num + img <= 7) {
//         Carousel.src = `../fotos/carrosel/${img + num}.jpg`;
//     };
// };

const isLogged = (num) => {
    const perfil = document.getElementById('perfil');

    if (num){
        perfil.href = 'Telaperfil.html';
    }
    else {
        perfil.href = 'Teladelogin.html';
    }
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

const removespecialcharacters = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

// EVENTOS
search.addEventListener('keyup', async (event) => {
    const search = event.target.value;

    if (search != ''){
        const itens = await getProducts(search);

        showProducts(itens);
    }
    else{
        NoResults.classList.add('Hide');
        NoResults.classList.remove('sem-resultado');
        SearchedProducts.classList.add('Hide');
        main.classList.remove('Hide');
    }

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

window.addEventListener('load', async () => {
    const ProductsHighlights = await getProducts('');

    createHighlights(ProductsHighlights);

    if (localStorage.getItem('token')) {
        isLogged(true);
    }
    else {
        isLogged(false);
    }

});

// btnLeft.addEventListener('click', (e) => {
//     e.preventDefault();

//     ImgCarousel(-1);
// });

// btnRigth.addEventListener('click', (e) => {
//     e.preventDefault();

//     ImgCarousel(1);
// });