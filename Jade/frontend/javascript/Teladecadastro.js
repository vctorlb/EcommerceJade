// VARIÁVEIS
const inputCadastro = document.querySelector(".form-cadastro");

// FUNÇÕES
const validateForm = () => {
    const email = document.getElementById('email').value;
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const dataNasci = document.getElementById('Data de nascimento').value;
    const telefone = document.getElementById('telefone').value;
    const cpf = document.getElementById('cpf').value;

    // Validação do nome
    var nomeRegex = /^[a-zA-Z ]+$/;
    if (!nomeRegex.test(nome)) {
        alert('Nome inválido. Não deve conter números ou caracteres especiais.');
        return {};
    }

    // Validação do email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email inválido');
        return {};
    }

    // Validação do telefone
    var telefoneRegex = /^\d{11}$/;
    if (!telefoneRegex.test(telefone)) {
        alert('Telefone inválido. Deve conter apenas números e 11 dígitos.');
        return {};
    }

    // Validação do cpf
    var cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
        alert('CPF inválido. Deve conter apenas números e 11 dígitos.');
        return {};
    }

    // Validação da data de nascimento
    let data = new Date(dataNasci);
    let hoje = new Date();
    if ((hoje.getFullYear() - data.getFullYear()) < 18) {
        alert('Você deve ser maior de idade para prosseguir.');
        return {};
    }

    //  Validação da senha
    if(senha !== confirmarSenha) {
        alert('Confirmar senha está diferente');
        return {};
    }

    return {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
        data_nascimento: dataNasci,
        cpf: cpf
    };
}

const createUser = async (user) => {

    const User = user;

    await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(User)
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensagem === 'Cadastro Concluído') {
            alert('cadastro concluído.');
            window.location.href = './Teladelogin.html';
        }
    })
    .catch (error => {
        console.error('Erro ao enviar dados para o servidor', error);
    })

}

// EVENTOS
inputCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = validateForm();
    console.log(user);
    if (Object.keys(user).length !== 0){
        await createUser(user);
    }
    
});