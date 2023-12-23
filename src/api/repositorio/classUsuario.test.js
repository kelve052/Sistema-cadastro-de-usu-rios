import UsuarioClasse from "./classUsuario.js"
import { dataBaseUsuarios, registroLogins, registroUsuariosAtivo } from "../dados.js"
import bcrypt from 'bcrypt'

const usuario = new UsuarioClasse()

describe('Testes dos mestodos Usuario', ()=>{
  test('Criar usuário - (criarUsuario())', ()=>{
    //Arrange
    const body = {
      nome: "Test",
      email: "test@gmail.com",
      senha: "$2b$10$ALZ0SLQRuwsJqR55HqS3Kuezf1z3eOF0llTFDExP4nVAvYkWpCJ1G", //senha AQteste152$$
      listaDePermissoes: "teste1, teste2, teste3",
      dataCriacao : new Date().toLocaleDateString(),
      ultimaDataLogin : null,
      statusAtivacao : false
    }

    //Act
    usuario.criarUsuario(body, body.senha)

    //Assert
    expect(dataBaseUsuarios).toHaveLength(1);
    expect(dataBaseUsuarios[0].nome).toBe('Test');
    expect(dataBaseUsuarios[0].email).toBe('test@gmail.com');
  })

  test('Listar Usuarios - listarUsuarios()', ()=>{
    //Arrange

    //Act
    const response = usuario.listarUsuarios()
    //Assert
    expect(response).toBeInstanceOf(Array);
  })

  test('Validar campos - validarCampos()', ()=>{
    //Arrange
    const body = {
      nome: "Test1",
      email: "test1@gmail.com",
      senha: "AQteste152$$",
      listaDePermissoes: "teste1, teste2, teste3"
    }

    //Act
    const usuarioValido = usuario.validarCampos(body)

    //Assert
    expect(usuarioValido).toBeInstanceOf(Object)
    expect(usuarioValido.dataCriacao).toBe(new Date().toLocaleDateString())
  })

  test('Validar senha - validarSenha()', ()=>{
    //Arrange
    const senha = 'AQteste152$$'

    //Act
    const response = usuario.validarSenha(senha)

    //Assert
    expect(response).toBeUndefined(); //se passar em todos os requisitos ela não retorna nada!
  })

  test('Criar hash de senha - criarHashSenha()', () => {
    // Arrange
    const senha = 'AQteste152$$';

    // Act
    const response = usuario.criarHashSenha(senha); // retorna hash

    // Assert
    expect(bcrypt.compareSync(senha, response)).toBe(true);
  });

  test('Verificar hash de senha - verificarSenhaHash()', ()=>{
    //metodo é usado para logar usuário por isso tambem recebe email

    //Arrange
    const email = 'test@gmail.com'
    const senha = 'AQteste152$$'

    //Act
    const response = usuario.verificarSenhaHash(email, senha)//retorna usuario do email


    //Assert
    expect(response).toBeInstanceOf(Object)
  })

  test('Validar email - validarEmail()', ()=>{
    //Arrange
    const email = 'test@gmaildiferente.com'

    //Act
    const response = usuario.validarEmail(email) //se passar em todos os requisitos ele retorna nada!


    //Assert
    expect(response).toBeUndefined()
  })

  test('Atualizar usuário - atualizarUsuario()', ()=>{
    //Arrange
    dataBaseUsuarios.push({
      id: 50,
      nome: "Test",
      email: "test@gmail.com",
      senha: "$2b$10$ALZ0SLQRuwsJqR55HqS3Kuezf1z3eOF0llTFDExP4nVAvYkWpCJ1G", //senha AQteste152$$
      listaDePermissoes: "teste1, teste2, teste3",
      dataCriacao : '22/02/2020',
      ultimaDataLogin : '25/04/2020',
      statusAtivacao : false
    })
    const id = 50

    const body = {
      nome: "Nome Novo",
      email: "test1@gmail.com",
      senha: "AQteste152$$",
      listaDePermissoes: "teste1, teste2, teste3"
    }
    const hash = '$2b$10$ALZ0SLQRuwsJqR55HqS3Kuezf1z3eOF0llTFDExP4nVAvYkWpCJ1G' // senha AQteste152$$

    const newbody = {
      id: 50,
      nome: "Nome Novo",
      email: "test1@gmail.com",
      senha: "$2b$10$ALZ0SLQRuwsJqR55HqS3Kuezf1z3eOF0llTFDExP4nVAvYkWpCJ1G", //senha AQteste152$$
      listaDePermissoes: "teste1, teste2, teste3",
      dataCriacao : '22/02/2020',
      ultimaDataLogin : '25/04/2020',
      statusAtivacao : false
    }

    //Act
    const response = usuario.atualizarUsuario(id, body, hash)

    //Assert
    expect([response]).toEqual([newbody]);
  })

  test('Deta um usuário - deletarUsuario()', ()=>{
    //Arrange
    const usuarioParaDeletar = {
      id: 60,
      nome: "delte",
      email: "delete@gmail.com",
      senha: "$2b$10$ALZ0SLQRuwsJqR55HqS3Kuezf1z3eOF0llTFDExP4nVAvYkWpCJ1G",
      listaDePermissoes: "delete1, delete2, delete3",
      dataCriacao : '22/02/2020',
      ultimaDataLogin : '25/04/2020',
      statusAtivacao : true
    }
    dataBaseUsuarios.push(usuarioParaDeletar)
    const id = 60

    //Act
    const response = usuario.deletarUsuario(id)


    //Assert
    expect([response]).toEqual([usuarioParaDeletar]);
  })

  test('lista os usuários logados - listarRegistroLogins()', ()=>{
    //Arrange

    //Act
    const response = usuario.listarRegistroLogins()

    //Assert
    expect(response).toBeInstanceOf(Array)
  })

  test('Verifica se email esta na lista de logins - verificarEmailInLogin()', ()=>{
    //Arrange
    const email = "test@test152.com.br"
    //Act
    const response = usuario.verificarEmailInLogin(email) // retorna nada, se não estiver
    //Assert
    expect(response).toBeUndefined()
  })

  test('loga um usuário - login()', ()=>{
    //Arrange
    const usuarioParaLogar = {
      id: 70,
      nome: "Ana",
      email: "ana@gmail.com",
      senha: "$2b$10$ALZ0SLQRuwsJqR55HqS3Kuezf1z3eOF0llTFDExP4nVAvYkWpCJ1G",
      listaDePermissoes: "lista1, lista2, lista3",
      dataCriacao : '22/02/2020',
      ultimaDataLogin : '25/04/2020',
      statusAtivacao : false
    }
    dataBaseUsuarios.push(usuarioParaLogar)
    
    //Act
    const response = usuario.login(usuarioParaLogar)

    //Assert
    expect([response]).toEqual([{email: "ana@gmail.com", token: response.token}]);
  })

  test('realiza logout de um usuário - logout()', ()=>{
    //Arrange
    const usuarioParaLogout = {
      id: 71,
      email: "logout@gmail.com",
      token: "token_15df5_fdfaazr4"
    }
    registroLogins.push(usuarioParaLogout)
    
    //Act
    const response = usuario.logout(usuarioParaLogout) // caso bem sucedido não retorna nada

    //Assert
    expect(response).toBeUndefined()
  })

  test('Verifica se usuário esta na lista de ativos - verificarEmailInAtivado()', ()=>{
    //Arrange
    const email = 'test@gmail.com'
    
    //Act
    const response = usuario.verificarEmailInAtivado(email) // caso bem sucedido não retorna nada

    //Assert
    expect(response).toBeUndefined()
  })

  test('Verifica se usuário esta na lista de ativos - ativarUsuario()', ()=>{
    //Arrange
    const usuarioParaAtivar = {
      id: 71,
      nome: "Ana",
      email: "ana@gmail.com",
      senha: "$2b$10$ALZ0SLQRuwsJqR55HqS3Kuezf1z3eOF0llTFDExP4nVAvYkWpCJ1G",
      listaDePermissoes: "lista1, lista2, lista3",
      dataCriacao : '22/02/2020',
      ultimaDataLogin : '25/04/2020',
      statusAtivacao : false
    }
    dataBaseUsuarios.push(usuarioParaAtivar)
    
    //Act
    const response = usuario.ativarUsuario(usuarioParaAtivar)

    //Assert
    expect(response).toEqual({email: usuarioParaAtivar.email, senha: usuarioParaAtivar.senha})
  })
  
  test('desativa um usuario - desativarUsuario()', ()=>{
    //Arrange
    const usuarioParaDesativar = {
      id: 79,
      nome: "Paula",
      email: "Paula@gmail.com",
      senha: "$2b$10$ALZ0SLQRuwsJqR55HqS3Kuezf1z3eOF0llTFDExP4nVAvYkWpCJ1G",
      listaDePermissoes: "lista1, lista2, lista3",
      dataCriacao : '22/02/2020',
      ultimaDataLogin : '25/04/2020',
      statusAtivacao : false
    }
    registroUsuariosAtivo.push(usuarioParaDesativar)

    //Act
    const response = usuario.desativarUsuario(usuarioParaDesativar)// caso bem sucedido não retorna nada

    //Asset
    expect(response).toBeUndefined()
  })
})
