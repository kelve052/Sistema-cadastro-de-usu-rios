import { dataBaseUsuarios, registroLogins, registroUsuariosAtivo } from "../dados.js";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";

class UsuarioClasse {
  listarUsuarios(){
    return dataBaseUsuarios
  }

  criarUsuario(body, hash){
    const ultimoId = dataBaseUsuarios.length > 0 ? dataBaseUsuarios[dataBaseUsuarios.length - 1].id : 0;
    const id = ultimoId + 1
    const {nome, email, listaDePermissoes, dataCriacao, ultimaDataLogin, statusAtivacao} = body
    const newBody = {id, nome, email, senha: hash, listaDePermissoes, dataCriacao, ultimaDataLogin, statusAtivacao}
    dataBaseUsuarios.push(newBody)
  }
  validarCampos(body, newCampos = true) {
    const { nome, email, senha, listaDePermissoes } = body;
  
    if (!nome || !email || !senha || !listaDePermissoes) {
      throw new Error("Propriedades no corpo faltando! Propriedades necessárias: nome, email, senha, listaDePermissoes");
    }
  
    if (newCampos) {
      // Caso for uma edição de usuário, não resetar os campos!
      const dataCriacao = new Date().toLocaleDateString();
      const ultimaDataLogin = null;
      const statusAtivacao = false;
  
      return { nome, email, senha, listaDePermissoes, dataCriacao, ultimaDataLogin, statusAtivacao };
    }

    return { nome, email, senha, listaDePermissoes };
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

  validarEmail(email, id = null){
    //id null no caso de edição, recebe o id para verificar se o email não pertence a ele mesmo
    // no caso de criaçao fica como null e na edição recebe o id
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValido = emailRegex.test(email);
    
    if (!emailValido) {
      throw new Error("O e-mail inserido não é válido");
    }
  
    // Verifica se o e-mail já existe para outro usuário
    const emailExistente = dataBaseUsuarios.some(usuario => usuario.email === email && usuario.id != id);

    if (emailExistente) {
      throw new Error("O e-mail inserido já pertence a outro usuário!");
    }
  }

  atualizarUsuario(id, body, hash){
    const indexusuario = dataBaseUsuarios.findIndex(usuario => usuario.id == id)
    if(indexusuario == -1){
      throw new Error(`não existe usuario com este id: ${id}!`);
    }
    body.id = Number(id)
    body.senha = hash
    body.dataCriacao = dataBaseUsuarios[indexusuario].dataCriacao
    body.ultimaDataLogin = dataBaseUsuarios[indexusuario].ultimaDataLogin
    body.statusAtivacao = dataBaseUsuarios[indexusuario].statusAtivacao

    return dataBaseUsuarios[indexusuario] = body
  }

  deletarUsuario(id){
    const indexusuario = dataBaseUsuarios.findIndex(usuario => usuario.id == id)
    if(indexusuario == -1){
      throw new Error(`não existe usuario com este id: ${id}!`);
    }
    return dataBaseUsuarios.splice(indexusuario, 1)[0]
  }
  listarRegistroLogins(){
    return registroLogins
  }

  verificarEmailInLogin(email){ // verifica se usuario já esta logado
    const emailLogin = registroLogins.find(registro => registro.email === email)
    if(emailLogin){
      throw new Error(`O usuario do email: ${email} ja esta logado!`);
    }
  }
  login(usuarioLogin){
    const indexUsuario = dataBaseUsuarios.findIndex(usuario => usuario.id == usuarioLogin.id)
    dataBaseUsuarios[indexUsuario].ultimaDataLogin = new Date().toLocaleDateString()
    const token = Jwt.sign(usuarioLogin, "HH12", {expiresIn: '1h'});
    const {email} = usuarioLogin
    const newUsuarioLogin = {email, token: token}
    registroLogins.push(newUsuarioLogin)
    return newUsuarioLogin
  }

  logout(usuarioLogout){
    //frerifica se usuario está logado
    const usuarioLogado = registroLogins.find(usuario => usuario.email == usuarioLogout.email)
    if(!usuarioLogado){
      throw new Error('Usuário não está logado')
    }

    const indexRegistro = registroLogins.findIndex(registro => registro.email === usuarioLogout.email)
    registroLogins.splice(indexRegistro, 1)
  }

  verificarEmailInAtivado(email){ // verifica se usuario já esta logado
    const emailAtivo = registroUsuariosAtivo.find(registro => registro.email == email)
    console.log(emailAtivo)
    if(emailAtivo){
      throw new Error(`O usuario do email: ${email} ja está ativo!`);
    }
  }

  ativarUsuario(usuarioAtivar){
    const indexUsuario = dataBaseUsuarios.findIndex(usuario => usuario.id == usuarioAtivar.id)
    dataBaseUsuarios[indexUsuario].statusAtivacao = true
    const {email, senha} = usuarioAtivar
    const body = {email, senha}
    registroUsuariosAtivo.push(body)
  }

  desativarUsuario(usuarioAtivar){
    //frerifica se usuario está ativo
    const usuarioLogado = registroUsuariosAtivo.find(usuario => usuario.email == usuarioAtivar.email)
    if(!usuarioLogado){
      throw new Error('Usuário não está Ativo')
    }
    
    const indexUsuario = dataBaseUsuarios.findIndex(usuario => usuario.id == usuarioAtivar.id)
    try {
      dataBaseUsuarios[indexUsuario].statusAtivacao = false
    } catch (error) {
      // no caso de usuario for deletado, ignora o erro de não encontrar statusAtivacao
    }
    const indexRegistrosAtivo = registroUsuariosAtivo.findIndex(registro => registro.email == usuarioAtivar.email)
    registroUsuariosAtivo.splice(indexRegistrosAtivo, 1)
  }
}

export default UsuarioClasse