# API CRUD - Gerenciamento de Autenticação, Categorias e Produtos
## Esta API RESTful foi desenvolvida para gerenciar autenticação de usuários, categorias e produtos. Ela implementa funcionalidades completas de CRUD (Create, Read, Update, Delete) com foco em segurança, validação e escalabilidade.

## 🛠️ Tecnologias Utilizadas
- Node.js: Ambiente de execução JavaScript para construir a API.
- Express: Framework minimalista para criar rotas e gerenciar requisições.
- MongoDB: Banco de dados NoSQL para armazenar as informações.
- Mongoose: ODM (Object Data Modeling) para interação com o MongoDB.
- JWT (Json Web Token): Autenticação e autorização via tokens.
- dotenv: Gerenciamento de variáveis de ambiente.
- express-validator: Validação de entrada de dados para maior segurança.
- Postman/Insomnia: Ferramentas sugeridas para testar a API.

## 📋 Funcionalidades
### 🔒 Autenticação
- Registro e login de usuários.
- Geração e validação de tokens JWT para proteger rotas.
### 📁 Categorias
- Criar, listar, atualizar e deletar categorias.
- Associar produtos às categorias.
### 📦 Produtos
- Criar, listar, atualizar e deletar produtos.
- Associar produtos a uma ou mais categorias.
### ✅ Validações
- Validação de entrada de dados com express-validator.
### 🔑 Middleware de Autenticação
- Proteção de rotas sensíveis usando JWT.
### 🔧 Pré-requisitos
## Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/)
- npm (vem junto com o Node.js)
## 🚀 Instalação e Configuração
### 1️⃣ Clone o Repositório
```
git clone https://github.com/Marcus-Antonio1/API-TESTE-OPA.git
cd API-TESTE-OPA
```
## 2️⃣ Instale as Dependências
### No diretório raiz do projeto, execute:
```
npm install

```
## 3️⃣ Configure as Variáveis de Ambiente
### Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
```
MONGO_URI=mongodb://localhost:27017/( teste-dev-opa ou a que você criar )
JWT_SECRET=sua_chave_secreta
```
- MONGO_URI: URL de conexão com o MongoDB (local ou remoto).
- JWT_SECRET: Chave secreta para geração e validação de tokens JWT.
- A porta foi passada no arquivo server.js sendo por padrão a 3000
### 4️⃣ Inicie o MongoDB
- Certifique-se de que o MongoDB está rodando em sua máquina local ou em um servidor remoto.

## 📂 Estrutura do Projeto
```
.
├── config/
│   └── db.js            # Configuração da conexão com o MongoDB
├── controllers/
│   ├── authController.js       # Lógica de autenticação
│   ├── categoryController.js   # Lógica para categorias
│   └── productController.js    # Lógica para produtos
├── middleware/
│   └── authMiddleware.js       # Middleware para autenticação JWT
├── models/
│   ├── Category.js             # Modelo de Categoria
│   ├── Product.js              # Modelo de Produto
│   └── User.js                 # Modelo de Usuário
├── routes/
│   ├── authRoutes.js           # Rotas de autenticação
│   ├── categoryRoutes.js       # Rotas de categorias
│   └── productRoutes.js        # Rotas de produtos
├── server.js                   # Arquivo principal do servidor
├── .env                        # Variáveis de ambiente
└── package.json
```
## 🛠️ Uso
### 1️⃣ Inicie o Servidor
- Execute o comando abaixo no terminal:
```
node server.js
```
- O servidor será iniciado na porta definida. Por padrão, é a 3000.

## 2️⃣ Teste a API
### Use ferramentas como Postman ou Insomnia para interagir com os endpoints abaixo.

## 🔗 Endpoints
### 🔒 Autenticação
- POST http://localhost:3000/api/auth/register: Registro de um novo usuário.
```
{
  "username": "exemplo",
  "password": "senha123"
}

```
- POST http://localhost:3000/api/auth/login: Login e geração de token JWT.
```
{
  "username": "exemplo",
  "password": "senha123"
}

```
### 📁 Categorias
- POST http://localhost:3000/api/categories: Criar categoria. (Requer token JWT)
```
{
  "name": "Categoria teste",
  "description": "Categoria de teste"
}

```
- GET http://localhost:3000/api/categories: Listar todas as categorias com seus produtos.

- GET http://localhost:3000/api/categories/:id: Detalhes de uma categoria.

- PUT http://localhost:3000/api/categories/:id: Atualizar uma categoria. (Requer token JWT)
```
{
  "name": "Eletrodomésticos",
  "description": "Produtos para casa"
}

```
- DELETE http://localhost:3000/api/categories/:id: Deletar uma categoria. (Requer token JWT)
```


```
### 📦 Produtos
- POST http://localhost:3000/api/products: Criar produto. (Requer token JWT)
```
{
  "name": "Produto X",
  "description": "Produto de teste",
  "price": 1500.99,
  "amount": 10,
  "categories": ["ID categoria"]
}

```
- GET http://localhost:3000/api/products: Listar todos os produtos.

- GET http://localhost:3000/api/products/:id: Detalhes de um produto.

- PUT http://localhost:3000/api/products/:id: Atualizar um produto. (Requer token JWT)
```
{
  "name": "Produto XY",
  "description": "Produto de teste",
  "price": 1500.99,
  "amount": 10,
  "categories": ["ID categoria"]
}

```
- DELETE http://localhost:3000/api/products/:id: Deletar um produto. (Requer token JWT)

## ⚙️ Detalhes Técnicos
### Banco de Dados
- A conexão com o MongoDB é configurada em config/db.js:

## 🔑 Middleware de Autenticação
- As rotas protegidas utilizam o middleware authMiddleware.js para validar o token JWT:
### OBSERVAÇÃO: Para determinadas ações será necessário a utilização do seu token recebido no momento do login que tem tempo de expiração de 1h que deve ser adicionado no header no postman, para usar esse token você deve ir em:
 - Aba de authorization -> type selecionar Bearer Token -> inserir o seu token de login

## 🧪 Testando a API
- Utilize ferramentas como Postman ou Insomnia para testar os endpoints. Certifique-se de seguir a ordem correta para evitar erros de associação, começando pelo registro e login de usuário, criação de categorias e produtos, e assim por diante.

## 🔄 Fluxo de Teste Recomendado
- Registrar um Usuário
- Fazer Login para obter o Token JWT
- Criar uma Categoria
- Criar um Produto associado à Categoria
- Listar Categorias
- Atualizar e Deletar Categorias e Produtos conforme necessário
