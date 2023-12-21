import dataBaseUsuarios from "../dados.js";
import bcrypt from 'bcrypt'

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
    const statusAtivacao = null
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

  verificarSenhaHash(id, senha){

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
}

export default UsuarioClasses