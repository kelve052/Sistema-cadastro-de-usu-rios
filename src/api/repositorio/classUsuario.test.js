import UsuarioClasse from "./classUsuario.js"
import { dataBaseUsuarios } from "../dados.js"
import bcrypt, { hash } from 'bcrypt'
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
    console.log(response)
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
    const response = usuario.verificarSenhaHash(email, senha)//retorna usuario do emial


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
    const response = usuario.atualizarUsuario(id, body, hash) //se passar em todos os requisitos ele retorna nada!

    //Assert
    console.log(response)
    expect([response]).toEqual([newbody]);
  })
})