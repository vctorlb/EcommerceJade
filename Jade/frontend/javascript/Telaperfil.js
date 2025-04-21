// VARIÁVEIS
const perfilForm = document.querySelector('.form-perfil');
var idCliente = 0;

// FUNÇÕES
const atualizatPerfil = async (perfil) => {

    await fetch('http://localhost:3000/perfilUpdate', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(perfil)
    })
    .then(response => response.json())
    .then(data => {
         alert(data.mensagem);
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

}

const getPerfil = async (email) => {
    const cliente = { email: email };
    let clienteDados = {};

    await fetch('http://localhost:3000/getUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(data => {
        clienteDados = data;
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return clienteDados;
};

// EVENTOS
perfilForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fotoPerfilInput = document.getElementById('foto_perfil_input');
    const imgPerfilContainer = document.getElementById('imgPerfilContainer');
    const imgPerfil = document.getElementById('imgPerfil');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');
    const inputTelefone = document.getElementById('telefone');
    const inputCpf = document.getElementById('cpf');
    const inputSenha = document.getElementById('senha');
    const inputConfirmarSenha = document.getElementById('confirmar-senha');
    const inputDataNascimento = document.getElementById('Data de nascimento');

    var nomeRegex = /^[a-zA-Z ]+$/;
    if (!nomeRegex.test(inputNome.value)) {
        alert('Nome inválido. Não deve conter números ou caracteres especiais.');
        return false;
    }

    // Validação do email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail.value)) {
        alert('Email inválido');
        return false;
    }

    // Validação do telefone
    var telefoneRegex = /^\d{11}$/;
    if (!telefoneRegex.test(inputTelefone.value)) {
        alert('Telefone inválido. Deve conter apenas números e 11 dígitos.');
        return false;
    }

    // Validação do cpf
    var cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(inputCpf.value)) {
        alert('CPF inválido. Deve conter apenas números e 11 dígitos.');
        return false;
    }

    // Validação da data de nascimento
    let data = new Date(inputDataNascimento.value);
    let hoje = new Date();
    if ((hoje.getFullYear() - data.getFullYear()) < 18) {
        alert('Você deve ser maior de idade para prosseguir.');
        return false;
    }

    // Validação senha
    if (inputSenha.value !== inputConfirmarSenha.value) {
        alert('As senhas não coincidem. Tente novamente.');
        return false;
    }
    
    const userProfile = {
        id_cliente: idCliente,
        nome: inputNome.value,
        email: inputEmail.value,
        senha: inputSenha.value.trim(),
        telefone: inputTelefone.value,
        cpf: inputCpf.value,
        data_nascimento: inputDataNascimento.value
    };

    await atualizatPerfil(userProfile);

    return true;
});

window.addEventListener('load', async () => {

    const fotoPerfilInput = document.getElementById('foto_perfil_input');
    const imgPerfilContainer = document.getElementById('imgPerfilContainer');
    const imgPerfil = document.getElementById('imgPerfil');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');
    const inputTelefone = document.getElementById('telefone');
    const inputCpf = document.getElementById('cpf');
    const inputSenha = document.getElementById('senha');
    const inputConfirmarSenha = document.getElementById('confirmar-senha');
    const inputDataNascimento = document.getElementById('Data de nascimento');

    const Perfildados = await getPerfil(localStorage.getItem('token'));

    inputNome.value = Perfildados.nome;
    inputEmail.value = Perfildados.email;
    inputTelefone.value = Perfildados.telefone;
    inputCpf.value = Perfildados.cpf;
    inputDataNascimento.value = Perfildados.data_nascimento.substring(0, 10);
    idCliente = Perfildados.id_cliente;
    // try {
    //     const response = await fetch('http://localhost:3000/perfil', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(userProfile),
    //     });

    //     const data = await response.json();

    //     // Lógica para lidar com a resposta do servidor
    //     if (response.ok) {
    //         console.log('Perfil atualizado com sucesso:', data);
    //     } else {
    //         console.error('Erro ao atualizar perfil:', data.message);
    //     }
    // } catch (error) {
    //     console.error('Erro na requisição:', error);
    // }
});