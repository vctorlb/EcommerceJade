// VARIÁVEIS
const categorias = document.querySelectorAll('a.navbar-cat');
const carTable = document.querySelector('.table');
const tbody = carTable.getElementsByTagName('tbody')[0];
const Pedido = document.querySelector('.list-group');
const TotalPedido = Pedido.getElementsByTagName('li')[2].getElementsByTagName('strong')[1];
var timeout;

// FUNÇÕES
const UptadeShoppingCar = async(cliente, produto, quant) => {
    const item = { id_cliente: cliente, id_produto: produto, quantidade: quant };

    await fetch('http://localhost:3000/ShoppingCarUpdate', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.mensagem);
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

};

const RemoveShoppingCar = async(cliente, produto,) => {
    const item = { id_cliente: cliente, id_produto: produto };

    await fetch('http://localhost:3000/ShoppingCarRemove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.mensagem);
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

};

const getProductId = async (nome) => {
    const item = { nome: nome };
    let idProduto = 0;

    await fetch('http://localhost:3000/ProductId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        idProduto = data.id_produto;
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return idProduto;
}

const ValorTotal = (strong) => {
    var produtos = tbody.getElementsByTagName('tr');
    var valortotal = 0;
    for (var i = 0; i < produtos.length; i++) {
        var valor = produtos[i].lastChild.innerHTML.replace('R$', '');
        valortotal += parseFloat(valor);
    }

    strong.innerHTML =  parseFloat(valortotal).toFixed(2);
    strong.innerHTML = 'R$' + strong.innerHTML.toString();
}

const alterarQuantidade = async (button) => {
    const Filho = button.childNodes[0];
    var vo = button.parentNode.parentNode;
    var input = vo.querySelector('input');
    const nome = vo.parentNode.parentNode.getElementsByTagName('td')[0].innerText;
    const id = await getProductId(nome);
    const id_cliente = await getIdCliente(localStorage.getItem('token'));

    if (Filho.classList.contains('fa-minus') && parseInt(input.value, 10) > 0) {
        if (parseInt(input.value, 10) - 1 <= 0){
            tbody.removeChild(vo.parentNode.parentNode);
            await RemoveShoppingCar(id_cliente, id);
        }
        else {
            input.value = parseInt(input.value, 10) - 1;
        }
    }
    if (Filho.classList.contains('fa-plus')) {
        input.value = parseInt(input.value, 10) + 1;
    }
    input.value = input.value.toString();

    const valor = vo.parentNode.parentNode.getElementsByTagName('td')[1];
    const total = vo.parentNode.parentNode.getElementsByTagName('td')[3];
    total.innerHTML = (parseFloat(valor.innerHTML.replace('R$', '')) * parseInt(input.value)).toFixed(2);
    total.innerHTML = 'R$' + total.innerHTML;
    await UptadeShoppingCar(id_cliente, id, input.value);

    ValorTotal(TotalPedido);
};

const alterarQuantidadeInput = async (input) => {
    const vo = input.parentNode;
    const nome = vo.parentNode.parentNode.getElementsByTagName('td')[0].innerText;
    const id = await getProductId(nome);
    const id_cliente = await getIdCliente(localStorage.getItem('token'));

    if (input.value === '0') {
        tbody.removeChild(vo.parentNode.parentNode);
        await RemoveShoppingCar(id_cliente, id);
    }
    if (input.value !== '') {
        const valor = vo.parentNode.parentNode.getElementsByTagName('td')[1];
        const total = vo.parentNode.parentNode.getElementsByTagName('td')[3];
        total.innerHTML = (parseFloat(valor.innerHTML.replace('R$', '')) * parseInt(input.value)).toFixed(2);
        total.innerHTML = 'R$' + total.innerHTML;
        await UptadeShoppingCar(id_cliente, id, input.value);
    }
    else{
        clearTimeout(timeout);
        timeout = setTimeout(async function () {
            if (input.value === '') {
                alert('O campo de quantidade não pode ficar vazio.');
                input.value = '0';
                await alterarQuantidade(vo.getElementsByTagName('div')[1].getElementsByTagName('button')[0]);
            }
        }, 10000);
    }

    ValorTotal(TotalPedido);
}

const getCarrinho = async (id) => {
    const item = { id: id };
    let car = [];

    await fetch('http://localhost:3000/ShoppingCarItens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        car = data;
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return car;
};

const getIdCliente = async (email) => {
    const item = { email: email };
    let Idcliente = 0;

    await fetch('http://localhost:3000/userId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        Idcliente = data.id_cliente;
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return Idcliente;
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

const isLogged = (num) => {
    const perfil = document.getElementById('perfil');

    if (num){
        perfil.href = 'Telaperfil.html';
    }
    else {
        perfil.href = 'Teladelogin.html';
    }
};

const createElement = (tag, innertext = '', attributes = {}) => {
    const element = document.createElement(tag);
    element.innerText = innertext;

    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }

    return element;
};

const showShoppingCar = (Product) => {
    const { nome, preco, quantidade } = Product;

    const tr = createElement('tr');
    const td1 = createElement('td');
    const img = createElement('img', '', { src: `../fotos/produtos/${nome.replace(/\s/g, '')}.jpg` });
    const ProductName = document.createTextNode(`${nome}`);
    const td2 = createElement('td');
    const ProductValue = document.createTextNode(`R$${preco.toFixed(2)}`);
    const td3 = createElement('td');
    const div1 = createElement('div', '', { class: 'input-group' });
    const div2 = createElement('div', '', { class: 'input-group-prepend' });
    const button1 = createElement('button', '', { class: 'btn btn-secondary', type: 'button', onclick: 'alterarQuantidade(this)' });
    const i1 = createElement('i', '', { class: 'fas fa-minus' });
    const input = createElement('input', '', { type: 'form-control input-smaller text-center', value: `${quantidade}`, oninput: "alterarQuantidadeInput(this)" });
    const div3 = createElement('div', '', { class: 'input-group-append' });
    const button2 = createElement('button', '', { class: 'btn btn-secondary', type: 'button', onclick: 'alterarQuantidade(this)' });
    const i2 = createElement('i', '', { class: 'fas fa-plus' });
    const td4 = createElement('td');
    const TotalValue = document.createTextNode(`R$${(preco * quantidade).toFixed(2)}`);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    td1.appendChild(img);
    td1.appendChild(ProductName);
    td2.appendChild(ProductValue);
    td3.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(input);
    div1.appendChild(div3);
    div2.appendChild(button1);
    button1.appendChild(i1);
    div3.appendChild(button2);
    button2.appendChild(i2);
    td4.appendChild(TotalValue);

    tbody.appendChild(tr);

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

    const idCliente = await getIdCliente(localStorage.getItem('token'));

    const Carrinho = await getCarrinho(idCliente);
    
    Carrinho.forEach(produto => {
        showShoppingCar(produto);
    });

    ValorTotal(TotalPedido);
});