// VARIÁVEIS
const inputLogin = document.querySelector(".form-cadastro");

// EVENTOS
inputLogin.addEventListener('submit', async function(event) {
    event.preventDefault();

    let dadosLogin = new FormData(event.target);

    const email = dadosLogin.get('email');
    const password = dadosLogin.get('senha');
    const User = {user: email, senha: password};

    await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(User)
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensagem === 'Usuário não encontrado') {
            alert(data.mensagem);
        }
        if (data.mensagem === 'Login realizado com sucesso') {
            localStorage.setItem('token', email);
            alert(data.mensagem);
            window.location.href = './Telainicial.html';

        }
        if (data.mensagem === 'Senha incorreta') {
            alert(data.mensagem);
        }
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

});
