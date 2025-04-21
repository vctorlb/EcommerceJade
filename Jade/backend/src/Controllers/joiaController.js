const joiaModel = require('../Models/joiaModel')

const getJoia = async (request, response) => {
    const [ joia ] = await joiaModel.getJoia(request.body);
    
    return response.status(200).json(joia);
};

module.exports = {
    getJoia
}