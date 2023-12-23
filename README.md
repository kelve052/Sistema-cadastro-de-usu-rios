# Sistema de Gerenciamento de Usuários

## Descrição
Este sistema oferece funcionalidades para gerenciamento de usuários, incluindo operações como listar, cadastrar, atualizar e excluir usuários. Além disso, também oferece recursos de login, logout e ativação/desativação de usuários.

## Rotas

### Listar Usuários
- **Método:** GET
- **URL:** http://localhost:3000/listarUsuarios
- **Descrição:** Recupera a lista de usuários cadastrados.

### Criar Usuário
- **Método:** POST
- **URL:** http://localhost:3000/criarUsuario
- **Descrição:** Cria um novo usuário com base nos dados fornecidos.

### Atualizar Usuário
- **Método:** PUT
- **URL:** http://localhost:3000/atualizarUsuario/:id
- **Descrição:** Atualiza as informações de um usuário específico identificado pelo ID.

### Deletar Usuário
- **Método:** DELETE
- **URL:** http://localhost:3000/deletarUsuario/:id
- **Descrição:** Remove um usuário da base de dados com base no ID fornecido.

### Login
- **Método:** POST
- **URL:** http://localhost:3000/login
- **Descrição:** Realiza o login do usuário.

### Logout
- **Método:** DELETE
- **URL:** http://localhost:3000/logout
- **Descrição:** Desconecta o usuário.

### Ativar Usuário
- **Método:** POST
- **URL:** http://localhost:3000/ativar
- **Descrição:** Ativa um usuário.

### Desativar Usuário
- **Método:** DELETE
- **URL:** http://localhost:3000/desativar
- **Descrição:** Desativa um usuário.

*Observação: Substitua `:id` na URL pelas informações específicas do usuário.*

## Instalação

```bash
git clone https://github.com/kelve052/Sistema-gerenciamento-usuario.git
cd Sistema-gerenciamento-usuario
npm install
npm start
```

# Front-end
Acesse o arquivo `html/index.html` no navegador para interagir com a interface do usuário.

## Testes

Para executar os testes, utilize o seguinte comando:

```bash
npm test
```
