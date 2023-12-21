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
    usuario.criarUsuario(body)
    res.status(200).json({msg: "usuario criado com sucesso", usuario: body})
  } catch (error) {
    console.log(error)
    res.status(400).json({error: error.message})
  }
}

const putController = (req, res)=>{
  try {
    const id = req.params.id
    const body = usuario.validarCampos(req.body)
    usuario.validarSenha(body.senha)
    usuario.validarEmail(body.email)
    usuario.atualizarUsuario(id, body)
    res.status(200).json({Msg: "atualização bem sucedida"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
export { getController, postController, putController};