var express = require('express');
var router = express.Router();

/* Autenticacao */
router.post('/api/login/', require('../controllers/Login'));
router.post('/api/logoff/', require('../controllers/Logoff'));

/* Filmes */
router.get('/api/filmes/lista', require('../controllers/FilmesLista'));
router.get('/api/filmes/alugados', require('../controllers/FilmesAlugados'));

/* Locacao e Devolucao */
router.post('/api/filmes/alugar', require('../controllers/FilmesAlugar'));
router.post('/api/filmes/devolver', require('../controllers/FilmesDevolver'));

module.exports = router;