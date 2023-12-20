import dataBaseUsuarios from "../dados.js"

const getController = (req, res)=>{
  res.json({dados: dataBaseUsuarios})
}

export default getController