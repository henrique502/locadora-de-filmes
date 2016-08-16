# Locadora-de-Filmes



## Autenticação
### POST /api/login

Parâmetros:
* email string
* senha string

Retorno:
```json
  {
    "status": "OK",
    "data": {
      "token": "21lIiwM2Y...xOWFiNSJ9fQ==",
      "id": 1,
      "nome": "Henrique Rieger"
    }
  }
```

### POST /api/logoff

