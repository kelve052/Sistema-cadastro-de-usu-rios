import UsuarioClasses from "../repositorio/classusuario.js"

const usuario = new UsuarioClasses()

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
    const body = usuario.validarCampos(req.body)
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
    usuario.deletarUsuario(req.params.id)
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
export { getController, postController, putController, deleteController, getLogins, login, logout};