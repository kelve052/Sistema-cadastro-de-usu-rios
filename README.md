# Sistema de Gerenciamento de Usuários

## Descrição
Este sistema oferece funcionalidades para gerenciamento de usuários, incluindo operações como listar, cadastrar, atualizar, e excluir usuários. Além disso, também oferece recursos de login, logout e ativação/desativação de usuários.

## Rotas

### Listar Usuários
- **Método:** GET
- **URL:** /listarUsuarios
- **Descrição:** Recupera a lista de usuários cadastrados.

### Criar Usuário
- **Método:** POST
- **URL:** /criarUsuario
- **Descrição:** Cria um novo usuário com base nos dados fornecidos.

### Atualizar Usuário
- **Método:** PUT
- **URL:** /atualizarUsuario/:id
- **Descrição:** Atualiza as informações de um usuário específico identificado pelo ID.

### Deletar Usuário
- **Método:** DELETE
- **URL:** /deletarUsuario/:id
- **Descrição:** Remove um usuário da base de dados com base no ID fornecido.

### Login
- **Método:** POST
- **URL:** /login
- **Descrição:** Realiza o login do usuário.

### Logout
- **Método:** DELETE
- **URL:** /logout
- **Descrição:** Desconecta o usuário.

### Ativar Usuário
- **Método:** POST
- **URL:** /ativar
- **Descrição:** Ativa um usuário.

### Desativar Usuário
- **Método:** DELETE
- **URL:** /desativar
- **Descrição:** Desativa um usuário.

*Observação: Substitua `:id` na URL pelas informações específicas do usuário.*

## Instalação

```bash
git clone https://github.com/kelve052/Sistema-gerenciamento-usuario.git
cd Sistema-gerenciamento-usuario
npm install
npm start
```
# Front-end: apenas abra o arquivo html/index.html no navegador
