/* schemas */
schemas = {
    Usuario: {
        id: 0,
        nome: null,
        email: null,
        senha: null
    },
    Filme: {
        id: 0,
        titulo: null,
        diretor: null,
        copias: 0
    },
    Locacao: {
        usuario: 0,
        filme: 0
    }
};

module.exports = schemas;