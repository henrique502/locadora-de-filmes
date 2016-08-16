var express = require('express');
var router = express.Router();

/* Autentica��o */
router.post('/api/login/', require('../controllers/Login'));
router.post('/api/logoff/', require('../controllers/Logoff'));

/* Filmes */
router.get('/api/filmes/lista', require('../controllers/FilmesLista'));
router.get('/api/filmes/alugados', require('../controllers/FilmesAlugados'));

/* Loca��o e Devolu��o */
router.post('/api/filmes/alugar', require('../controllers/FilmesAlugar'));
router.post('/api/filmes/devolver', require('../controllers/FilmesDevolver'));

module.exports = router;