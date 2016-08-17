# Locadora-de-Filmes

## Retorno de erros

```javascript
{
  "status": "ERROR",
  "msg": "texto"
}
```

## Usuário

### POST /api/usuario/cadastrar
Corpo:
* nome string
* email string
* senha string

Retorno:
```javascript
{
  "status": "OK",
  "data": {
    "id": 5 // ID do usuário novo
  }
}
```

### POST /api/login
Corpo:
* email string
* senha string

Retorno:
```javascript
{
  "status": "OK",
  "data": {
    "token": "21lIiwM2Y...xOWFiNSJ9fQ==",
    "id": 1, // id do usuário
    "nome": "Henrique Rieger"
  }
}
```

### POST /api/logoff
Corpo:
* token string

Retorno:
```javascript
{
  "status": "OK",
  "data": {}
}
```

## Filmes

### GET /api/filmes/lista
Parâmetros:
* token string
* termo string (opcional)

Retorno:
```javascript
{
  "status": "OK",
  "data": [
    {
      "id": 1,
      "titulo": "Star Wars: Episódio VIII",
      "diretor": "Rian Johnson",
      "copias": 6,
      "alugados": 1
    }
  ]
}
```

### GET /api/filmes/alugados
Parâmetros:
* token string

Retorno:
```javascript
{
  "status": "OK",
  "data": [
    {
      "id": 1,
      "titulo": "Star Wars: Episódio VIII",
      "diretor": "Rian Johnson"
    }
  ]
}
```

## Locação e Devolução

### POST /api/filmes/alugar
Parâmetros:
* token string

Corpo:
* filmeId int

Retorno:
```javascript
{
  "status": "OK",
  "data": {
    "id": 1,
    "titulo": "Star Wars: Episódio VIII",
    "diretor": "Rian Johnson",
    "copias": 6
  }
}
```

### POST /api/filmes/devolver
Parâmetros:
* token string

Corpo:
* filmeId int

Retorno:
```javascript
{
  "status": "OK",
  "data": {
    "id": 1,
    "titulo": "Star Wars: Episódio VIII",
    "diretor": "Rian Johnson",
    "copias": 6
  }
}
```
