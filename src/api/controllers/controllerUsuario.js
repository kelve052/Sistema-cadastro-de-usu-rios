import UsuarioClasse from "../repositorio/classUsuario.js"

const usuario = new UsuarioClasse()

const getController = (req, res)=>{
  res.status(200).json({usuarios: usuario.listarUsuarios()})
}

const postController = (req, res)=>{
  try {
    const body = usuario.validarCampos(req.body)
    usuario.validarSenha(body.senha)
    usuario.validarEmail(body.email)
    const hash = usuario.criarHashSenha(body.senha)
    usuario.criarUsuario(body, hash)
    res.status(200).json({msg: "usuario criado com sucesso", usuario: body})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const putController = (req, res)=>{
  try {
    const id = req.params.id
    const body = usuario.validarCampos(req.body, false)//false porque o usuário já existe, para não ter campos sobrescritos
    usuario.validarSenha(body.senha)
    const hash = usuario.criarHashSenha(body.senha)
    usuario.validarEmail(body.email, id)
    usuario.atualizarUsuario(id, body, hash)
    res.status(200).json({Msg: "atualização bem sucedida"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteController = (req, res)=>{
  try {
    const usuarioDeletado = usuario.deletarUsuario(req.params.id)

    try {
      usuario.desativarUsuario(usuarioDeletado)
    } catch (error) {
      //ignorar erros pois o usuario a ser deletado pode ou não pode estar ativo
    }
    try {
      usuario.logout(usuarioDeletado)
    } catch (error) {
      //ignorar erros pois o usuario a ser deletado pode ou não pode estar logado
    }
    
    res.status(201).json()
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getLogins = (req, res)=>{
  try {
    const registroLogins = usuario.listarRegistroLogins()
    res.status(200).json({RegistroLogins: registroLogins})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const login = async (req, res)=>{
  try {
    const {email, senha} = req.body
    if(!email || !senha){
      throw new Error(`corpo incorreto! Informe email e senha`);
    }
    usuario.verificarEmailInLogin(email) //verfica se ja esta logado
    const usuarioLogin = await usuario.verificarSenhaHash(email, senha) //valida email e senha e retorna usuario
    const usuarioLogado = usuario.login(usuarioLogin)
    res.status(200).json({Msg: 'Login realizado com sucesso!',usuario: usuarioLogado})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const logout = async (req, res)=>{
  try {
    const {email, senha} = req.body
    if(!email || !senha){
      throw new Error(`corpo incorreto! Informe email e senha`);
    }
    const usuarioLogout = await usuario.verificarSenhaHash(email, senha)
    usuario.logout(usuarioLogout)
    res.status(200).json({msg: "logout realizado com sucesso!"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const postAtivar = async (req, res)=>{
  try {
    const {email, senha} = req.body
    if(!email || !senha){
      throw new Error(`corpo incorreto! Informe email e senha`);
    }
    usuario.verificarEmailInAtivado(email)
    const usuarioAtivo = await usuario.verificarSenhaHash(email, senha)
    usuario.ativarUsuario(usuarioAtivo)
    res.status(200).json({msg: usuarioAtivo})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
const deleteDesativar = async (req, res)=>{
  try {
    const {email, senha} = req.body
    if(!email || !senha){
      throw new Error(`corpo incorreto! Informe email e senha`);
    }
    const usuarioDesativar = await usuario.verificarSenhaHash(email, senha)
    usuario.desativarUsuario(usuarioDesativar)
    res.status(200).json({msg: "usuário desativado com sucesso!"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
export { getController, postController, putController, deleteController, getLogins, login, logout, postAtivar, deleteDesativar};