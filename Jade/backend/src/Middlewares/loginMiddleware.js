const validarLogin = (request, response, next) => {
    const { body } = request;
    
    if (body.user === undefined && body.senha === undefined) {
        return response.status(400).json({ mensagem: '"user" e "senha" required' });
    }
    
    if (body.user === '' && body.senha === '') {
        return response.status(400).json({ mensagem: '"user" e "senha" empty' });
    }

    if (body.user === undefined) {
        return response.status(400).json({ mensagem: '"user" required' });
    }

    if (body.user === '') {
        return response.status(400).json({ mensagem: '"user" empty' });
    }

    if (body.senha === undefined) {
        return response.status(400).json({ mensagem: '"senha" required' });
    }

    if (body.senha === '') {
        return response.status(400).json({ mensagem: '"senha" empty' });
    }

    next();
};

module.exports = {
    validarLogin
};