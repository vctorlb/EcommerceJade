// VARIÁVEIS
const buttonaddCar = document.getElementById('addCard');
const buttonaddendereco = document.getElementById('addEndereco');
const btnFinalizar = document.getElementById('finalizarpedido');

// FUNÇÕES
const exibirFormulario = () => {
    document.getElementById("novoCartaoForm").style.display = "block";
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

const validarEndereco = async () => {
    const numero = document.getElementById('novo-numero-da-casa').value;
    const rua = document.getElementById('nova-rua').value;
    const bairro = document.getElementById('novo-bairro').value;
    const cep = document.getElementById('novo-CEP').value;
    const cidade = document.getElementById('novo-cidade').value;
    const estado = document.getElementById('novo-estado').value;
    const complemento = document.getElementById('novo-complemento').value;

    console.log(numero);
    console.log(typeof numero);

    console.log(parseInt(numero));
    console.log(typeof parseInt(numero));

    if(!(parseInt(numero) >= 0)){
        alert('Numero da casa invalido');
        return {};
    }

    var ruaRegex = /^[a-zA-Z0-9\sáéíóúãõâêîôûàèìòùäëïöüç]+$/;
    if(!ruaRegex.test(rua)){
        alert('Caracteres invalidos no nome da rua');
        return {};
    }

    if (!ruaRegex.test(bairro)) {
        alert('Caracteres invalidos no nome de bairro');
        return {};
    }

    var intRegex = /^\d{5}-\d{3}$/
    if(!intRegex.test(cep)){
        alert('CEP invalido (formato correto XXXXX-XXX');
        return {};
    }

    if (!ruaRegex.test(cidade)) {
        alert('Caracteres inválidos para cidade');
        return {};
    }

    if (!ruaRegex.test(estado)) {
        alert('Caracteres inválidos para estado');
        return {};
    }

    var complementoRegex = /^[a-zA-Z0-9\sáéíóúãõâêîôûàèìòùäëïöüç.,-]*$/;
    if (!complementoRegex.test(complemento)) {
        alert('Caracteres inválidos para complemento');
        return {};
    }

    return{
        numero: numero,
        rua: rua,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        estado: estado,
        complemento: complemento,
        id_cliente: await getIdCliente(localStorage.getItem('token'))
    };
};

const adicionarNovoEndereco = async(formEndereco) => {

    fetch('http://localhost:3000/finalizarPedidoie', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formEndereco)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensagem);
    })
    .catch(error => console.error('Erro ao enviar dados ao servidor', error));
};

const validarCard = async () => {
    const nome_titular =  document.getElementById('nomeTitular').value;
    const numero_cartao = document.getElementById('numeroCartao').value;
    const data_validade = document.getElementById('vencimentoCartao').value;
    const cvv = document.getElementById('cvv').value;

    var nomeRegex = /^[\w\s]+$/;
    if(!nomeRegex.test(nome_titular)){
        alert('Nome invalido');
        return {};
    }

    var intRegex = /^\d{16}$/;
    if (!intRegex.test(numero_cartao)) {
        alert('Numero de cartão invalido');
        return {};
    }

    if (cvv.toString().length !== 3) {
        alert('CVV inválido');
        return {};
    }

    var dataRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dataRegex.test(data_validade)){
        alert('Data inválida (deve ser no formato mm/aaaa)');
        return {}
    }

    return{
        numero_cartao: numero_cartao,
        nome_titular: nome_titular,
        data_validade: data_validade,
        cvv: cvv,
        id_cliente: await getIdCliente(localStorage.getItem('token'))
    }
}

const adicionarNovoCartao = async(formcard) => {
    
    fetch('http://localhost:3000/finalizarPedidoic', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formcard)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensagem);
    })
    .catch(error => console.error('Erro ao enviar dados ao servidor', error));
};

const getEndereco = async(id) => {
    const endr = { id_cliente: id }
    let enderecos = []

    await fetch('http://localhost:3000/finalizarPedidoge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(endr)
    })
    .then(response => response.json())
    .then(data => {
        enderecos = data;
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return enderecos;
}

const getCartao = async(cliente) => {
    const cli = { id_cliente: cliente };
    let cartoes = []

    await fetch('http://localhost:3000/finalizarPedidogc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cli)
    })
    .then(response => response.json())
    .then(data => {
        cartoes = data;
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return cartoes;
}

const createElement = (tag, innertext = '', attributes = {}) => {
    const element = document.createElement(tag);
    element.innerText = innertext;

    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }

    return element;
};

const formatarNumero = (numero) => {
    const numerosApenas = numero.replace(/\D/g, '');
  
    const digitosMascarados = '*'.repeat(numerosApenas.length - 4) + numerosApenas.slice(-4);
  
    const caracteresApenas = digitosMascarados.replace(/[^0-9*]/g, '');

    const numeroFormatado = caracteresApenas.replace(/(\d{1,4}|\*{1,4})(?=[0-9*])/g, '$1 ');
      
    return numeroFormatado;
}

const showCard = (Card, num) => {
    const { numero_cartao, nome_titular, data_validade } = Card;

    const div = createElement('div', '', { class: 'form-check' });
    const input = createElement('input', '', { class:  "form-check-input", type: "radio", name: "storedCard", id: `storedCard${num}`, value: `card-${num}` });
    const label = createElement('label', '', { class: "form-check-label", for: `storedCard${num}` });
    const br1 = createElement('br');
    const br2 = createElement('br');
    const br3 = createElement('br');
    const cardName = document.createTextNode(`Cartão Armazenado ${num}`);
    const cardTitular = document.createTextNode(`Titular: ${nome_titular}`);
    const cardNumero = document.createTextNode(`Número: ${formatarNumero(numero_cartao)}`);
    const cardVencimento = document.createTextNode(`Vencimento: ${data_validade}`);

    div.appendChild(input);
    div.appendChild(label);
    label.appendChild(cardName);
    label.appendChild(br1);
    label.appendChild(cardTitular);
    label.appendChild(br2);
    label.appendChild(cardNumero);
    label.appendChild(br3);
    label.appendChild(cardVencimento);

    const btn = document.getElementById('adicionarCartaoBtn');
    btn.parentNode.insertBefore(div, btn);

};

const showEndereco = (endereco, nume) => {
    const { rua, numero, bairro, cep, estado, cidade, complemento } = endereco;

    const div = createElement('div', '', { class: 'form-check' });
    const input = createElement('input', '', { class:  "form-check-input", type: "radio", name: "endereco", id: `endereco-${nume}`, value: `endereco-${nume}` });
    const label = createElement('label', '', { class: "form-check-label", for: `endereco-${nume}` });
    const p = createElement('p');
    const br1 = createElement('br');
    const br2 = createElement('br');
    const br3 = createElement('br');
    const ruaEndereco = document.createTextNode(`${rua}`);
    const numEndereco = document.createTextNode(`${numero}`);
    const complementoBairro = document.createTextNode(`${complemento} ${bairro}`);
    const cidEstCEP = document.createTextNode(`${cidade}, ${estado} ${cep}`);
    const button = createElement('button', 'Alterar endereço', { class: 'btn btn-link' });

    div.appendChild(input);
    div.appendChild(label);
    label.appendChild(p);
    label.appendChild(button);
    p.appendChild(ruaEndereco);
    p.appendChild(br1);
    p.appendChild(numEndereco);
    p.appendChild(br2);
    p.appendChild(complementoBairro);
    p.appendChild(br3);
    p.appendChild(cidEstCEP);

    const divAdd = document.querySelector('.endereco-info');
    divAdd.appendChild(div);

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

//EVENTOS
buttonaddendereco.addEventListener('click', async(e) =>{
    e.preventDefault();
    const endereco = await validarEndereco();
    console.log(endereco);
    if (Object.keys(endereco).length !== 0){
        await adicionarNovoEndereco(endereco);
        showEndereco(endereco);
    }
});

buttonaddCar.addEventListener('click', async(e) => {
    e.preventDefault();
    const cartao = await validarCard();
    if (Object.keys(cartao).length !==0) {
        await adicionarNovoCartao(cartao);
        showCard(cartao);
    }
});

window.addEventListener('load', async() => {
    if (localStorage.getItem('token')) {
        isLogged(true);
    }
    else {
        isLogged(false);
    }

    const Idcliente = await getIdCliente(localStorage.getItem('token'));
    const cartoes = await getCartao(Idcliente);
    const endereco = await getEndereco(Idcliente);

    let nume = 1;
    endereco.forEach(ender => {
        showEndereco(ender, nume);
        nume += 1;
    });

    let num = 1;
    cartoes.forEach(cartao => {
        showCard(cartao, num);
        num += 1;
    });

});

btnFinalizar.addEventListener('click', async() =>{
    const card = document.querySelector('input[name="storedCard"]:checked');
    const address = document.querySelector('input[name="endereco"]:checked');
    if(card && address){
        alert('Compra finalizada')
    }
    else {
        alert('Você deve selecionar um endereço e uma forma de pagamento');
    }
})