function econderCaixaMensagem() {
  const div = document.querySelectorAll('.div_messagem_sucesso');
  div.forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById('overlay').style.display = 'none';
}

function cadastrar(){
  const nome = document.querySelector('#div_informacoes_cadastrar input[name="nome"]').value;
  const email = document.querySelector('#div_informacoes_cadastrar input[name="email"]').value;
  const senha = document.querySelector('#div_informacoes_cadastrar input[name="senha"]').value;
  const permissoes = document.querySelector('#div_informacoes_cadastrar input[name="permissoes"]').value;

  document.getElementById('messagem_erro').innerText = ''
  

  const usuario = {
    nome: nome,
    email: email,
    senha: senha,
    listaDePermissoes: permissoes,
  };

  fetch('http://localhost:3000/criarUsuario',
  {method: 'POST', 
  headers: {'content-type': 'application/json'},
  body: JSON.stringify(usuario)})
  .then(response => {
    if (!response.ok) {
      console.log(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if(!data.error){//operação bem sucedida
      document.getElementById('div_messagem_sucesso').style.display = 'flex'
      document.getElementById('overlay').style.display = 'block';
    }else{//operaçao retornou um erro
      document.getElementById('messagem_erro').innerText = data.error
    }
  })
  .catch(error => {
    console.log(error)
  })
}


function listarUsuarios(){

  fetch('http://localhost:3000/listarUsuarios', {
    method: 'GET'}
  )
  .then(response => {
    if (!response.ok) {
      console.log(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if(!data.error){//operação bem sucedida
      criarBlocosUsuarios(data.usuarios, 'div_informacoes_listar')
    }else{//operaçao retornou um erro
      console.log(data.error)
    }
  })
  .catch(error=>{
    console.log(error)
  })
}

function editarUsuario (){
  let id = document.querySelector('#div_informacoes_editar input[name="id"]').value;
  if(!id){ //para não da error na url da rota
    id = null
  }
  const nome = document.querySelector('#div_informacoes_editar input[name="nome"]').value;
  const email = document.querySelector('#div_informacoes_editar input[name="email"]').value;
  const senha = document.querySelector('#div_informacoes_editar input[name="senha"]').value;
  const permissoes = document.querySelector('#div_informacoes_editar input[name="permissoes"]').value;

  document.getElementById('messagem_erro_editar').innerText = ''
  

  const usuario = {
    nome: nome,
    email: email,
    senha: senha,
    listaDePermissoes: permissoes,
  };

  fetch(`http://localhost:3000/atualizarUsuario/${id}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(usuario)
  })
  .then(response => {
    if(!response.ok){
      console.log(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
  })
  .then(data => {
    if(!data.error){//operação bem sucedida
      document.getElementById('div_messagem_sucesso_editar').style.display = 'flex'
      document.getElementById('overlay').style.display = 'block';
    }else{//operaçao retornou um erro
      document.getElementById('messagem_erro_editar').innerText = data.error
    }
  })
}

function excluirUsuario(id) {
  fetch(`http://localhost:3000/deletarUsuario/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.status === 201) {
      document.getElementById('blocoExcluir_card').style.display = 'flex';
      botaoEscluirGerarLista() //atualiza a lista de usuarios
      setTimeout(() => {
        document.getElementById('blocoExcluir_card').style.display = 'none';
      }, 1000);
    } else {
      return response.json();
    }
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });
}


function botaoEscluirGerarLista(){ //para gerar a lista de usuarios para seleção de exclusão
  fetch('http://localhost:3000/listarUsuarios', {
    method: 'GET'}
  )
  .then(response => {
    if (!response.ok) {
      console.log(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if(!data.error){//operação bem sucedida
      criarBlocosUsuarios(data.usuarios, 'div_informacoes_excluir', true)
    }else{//operaçao retornou um erro
      console.log(data.error)
    }
  })
  .catch(error=>{
    console.log(error)
  })
}

function login(){
  const email = document.querySelector('#div_informacoes_login input[name="email"]').value;
  const senha = document.querySelector('#div_informacoes_login input[name="senha"]').value;

  const usuario = {
    email: email,
    senha: senha
  }

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(usuario)
  })
  .then(response =>{
    if(!response.ok){
      console.log(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
  })
  .then(data => {
    if(!data.error){
      document.getElementById('card_login_bem_sucedido').style.display = 'block'
      document.getElementById('ps_card_login_email_span').innerText = data.usuario.email
      document.getElementById('ps_card_login_token_span').innerText = data.usuario.token
      document.getElementById('overlay').style.display = 'block';
    }else{
      document.getElementById('messagem_erro_login').innerText = data.error
    }
  })
}

function logout(){
  const email = document.querySelector('#div_informacoes_logout input[name="email"]').value;
  const senha = document.querySelector('#div_informacoes_logout input[name="senha"]').value;

  const usuario = {
    email: email,
    senha: senha
  }

  fetch('http://localhost:3000/logout', {
    method: 'DELETE',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(usuario)
  })
  .then(response =>{
    if(!response.ok){
      console.log(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
  })
  .then(data => {
    if(!data.error){
      document.getElementById('card_logout_bem_sucedido').style.display = 'block'
      document.getElementById('overlay').style.display = 'block';
    }else{
      document.getElementById('messagem_erro_logout').innerText = data.error
    }
  })
}

function criarElementoUsuario(label, valor) {
  const elemento = document.createElement('p');
  elemento.innerHTML = `<span>${label}:</span> ${valor}`;
  return elemento;
}

function criarBlocosUsuarios(dataUsuarios, idElement , botao=null) {
  const h2Element = document.createElement('h2')
  h2Element.innerText = `Usuários Encontrados: ${dataUsuarios.length}`
  h2Element.classList.add('h2_usuarios_cadas')
  const container = document.getElementById(idElement);
  container.innerHTML = '';
  container.appendChild(h2Element);

  dataUsuarios.forEach(usuario => {
    const blocoUsuario = document.createElement('div');
    blocoUsuario.classList.add('bloco_usuario');

    
    const idElemento = criarElementoUsuario('ID', usuario.id);
    const nomeElemento = criarElementoUsuario('Nome', usuario.nome);
    const emailElemento = criarElementoUsuario('Email', usuario.email);
    const permissoesElemento = criarElementoUsuario('Lista de permissões', usuario.listaDePermissoes);
    const ultimaDataLoginElemento = criarElementoUsuario('Ultima data de Login', usuario.ultimaDataLogin);
    const statusAtivacaoElemento = criarElementoUsuario('Status de ativação', usuario.statusAtivacao);

    blocoUsuario.appendChild(idElemento);
    blocoUsuario.appendChild(nomeElemento);
    blocoUsuario.appendChild(emailElemento);
    blocoUsuario.appendChild(permissoesElemento);
    blocoUsuario.appendChild(ultimaDataLoginElemento);
    blocoUsuario.appendChild(statusAtivacaoElemento);
    

    
    if(botao==true){ // eceção na função excluirUsuario, criação de elementos!
      const botaoElemento = document.createElement('button')
      botaoElemento.innerText = 'Excluir'
      botaoElemento.onclick = ()=>excluirUsuario(usuario.id)
      blocoUsuario.appendChild(botaoElemento);
      const elementoP = document.createElement('p')
      elementoP.id = 'messagem_erro_excluir'
      blocoUsuario.appendChild(elementoP);
      const blocoExcluir = document.createElement('div')
      const pBlocoExcluir = document.createElement('p')
      pBlocoExcluir.innerText = 'Usuário Excluido com sucesso!'
      blocoExcluir.appendChild(pBlocoExcluir)
      blocoExcluir.id = 'blocoExcluir_card'
      blocoExcluir.classList.add('div_messagem_sucesso')
      blocoUsuario.appendChild(blocoExcluir)
      const imgElemento = document.createElement('img')
      imgElemento.src = '../imgs/icone_sucesso.png'
      blocoExcluir.appendChild(imgElemento)
      h2Element.innerText = `Excluir Usuários`
    }
    container.appendChild(blocoUsuario);
    econderCaixaMensagem()
  });
}