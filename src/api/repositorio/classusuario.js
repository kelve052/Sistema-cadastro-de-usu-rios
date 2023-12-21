import { dataBaseUsuarios, registroLogins } from "../dados.js";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";

class UsuarioClasses {
  listarUsuarios(){
    return dataBaseUsuarios
  }

  criarUsuario(body, hash){
    const ultimoId = dataBaseUsuarios[dataBaseUsuarios.length-1].id
    const id = ultimoId + 1
    const {nome, email, listaDePermissoes, dataCriacao, ultimaDataLogin, statusAtivacao} = body
    const newBody = {id, nome, email, senha: hash, listaDePermissoes, dataCriacao, ultimaDataLogin, statusAtivacao}
    dataBaseUsuarios.push(newBody)
  }
  validarCampos (body){
    const {nome, email, senha, listaDePermissoes} = body
    if(!nome || !email || !senha || !listaDePermissoes){
      throw new Error("propiedades no corpor faltando! propriedades necessárias: nome, email, senha, listaDePermissoes")
    }
    const dataCriacao = new Date().toLocaleDateString()
    const ultimaDataLogin = null
    const statusAtivacao = false
    const newBody = {nome, email, senha, listaDePermissoes, dataCriacao, ultimaDataLogin, statusAtivacao}
    return newBody;
  }
  validarSenha(senha){
    if (senha.length < 8) {
      throw new Error("A senha deve ter no mínimo 8 caracteres!");
    }
    
    const isMaiuscula = /[A-Z]/.test(senha);
    const isMinuscula = /[a-z]/.test(senha);
    const isNumero = /\d/.test(senha);
    const isCaracterEspecial = /[!@#$%^&*]/.test(senha);
    
    if (!isMaiuscula) {
      throw new Error("A senha deve conter pelo menos uma letra maiúscula!");
    }
    if (!isMinuscula) {
      throw new Error("A senha deve conter pelo menos uma letra minúscula!");
    }
    if (!isNumero) {
      throw new Error("A senha deve conter pelo menos um número!");
    }
    if (!isCaracterEspecial) {
      throw new Error("A senha deve conter pelo menos um caractere especial!");
    }
  }

  criarHashSenha(senha){
    const hash = bcrypt.hashSync(senha, 10)
    return hash
  }

  // busca usuario pelo email, e verifica se a {senha: hash} do usuario correspode a senha inserida
  async verificarSenhaHash(email, senha){
    const usuario = dataBaseUsuarios.find(usuario => usuario.email === email)
    if(!usuario){
      throw new Error(`nenhum usuario esncontrado com este email: ${email}`)
    }
    const hashSenha = usuario.senha
    const senhaValida = await bcrypt.compare(senha, hashSenha);
    if(!senhaValida){
      throw new Error(`senha invalida!`)
    }
    return usuario;  
  }

  validarEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emaelValido = emailRegex.test(email);
    
    if(!emaelValido){
      throw new Error("email inserido não é valido");
    }
    // ferifica se email já existe
    const emailExistente = dataBaseUsuarios.some(usuario => usuario.email === email);
    if(emailExistente){
      throw new Error("email inserido já pertence a um usuário!");
    }
  }

  atualizarUsuario(id, body, hash){
    const indexusuario = dataBaseUsuarios.findIndex(usuario => usuario.id == id)
    if(indexusuario == -1){
      throw new Error(`não existe usuario com este id: ${id}!`);
    }
    body.id = Number(id)
    body.senha = hash
    dataBaseUsuarios[indexusuario] = body
  }

  deletarUsuario(id){
    const indexusuario = dataBaseUsuarios.findIndex(usuario => usuario.id == id)
    if(indexusuario == -1){
      throw new Error(`não existe usuario com este id: ${id}!`);
    }
    dataBaseUsuarios.splice(indexusuario, 1)
  }
  listarRegistroLogins(){
    return registroLogins
  }

  verificarEmailInLogin(email){ // verifica se usuario já esta logado
    const emailLogin = registroLogins.find(registro => registro.email === email)
    if(emailLogin){
      throw new Error(`O usuario do email: ${email} ja esta cadastrado!`);
    }
  }
  login(usuarioLogin){
    const indexUsuario = dataBaseUsuarios.findIndex(usuario => usuario.id === usuarioLogin.id)
    dataBaseUsuarios[indexUsuario].ultimaDataLogin = new Date().toLocaleTimeString
    dataBaseUsuarios[indexUsuario].statusAtivacao = true
    const token = Jwt.sign(usuarioLogin, "HH42", {expiresIn: '1h'});
    const {email} = usuarioLogin
    const newUsuarioLogin = {email, token: token}
    registroLogins.push(newUsuarioLogin)
  }

  logout(usuarioLogout){
    const indexUsuario = dataBaseUsuarios.findIndex(usuario => usuario.id === usuarioLogout.id)
    const indexRegistro = registroLogins.findIndex(registro => registro.email === usuarioLogout.email)
    dataBaseUsuarios[indexUsuario].statusAtivacao = false
    registroLogins.splice(indexRegistro, 1)
  }
}

export default UsuarioClasses