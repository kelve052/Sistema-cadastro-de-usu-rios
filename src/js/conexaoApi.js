function econderCaixaMensagem() {
  const div = document.querySelectorAll('.div_mensagem_sucesso');
  div.forEach(section => {
    section.style.display = 'none';
  });
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
      setTimeout(() => {
        document.getElementById('div_messagem_sucesso').style.display = 'none'
        document.getElementById('overlay').style.display = 'none';
      }, 2000);
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
      criarBlocosUsuarios(data.usuarios)
    }else{//operaçao retornou um erro
      console.log(data.error)
    }
  })
}


function criarElementoUsuario(label, valor) {
  const elemento = document.createElement('p');
  elemento.innerHTML = `<span>${label}:</span> ${valor}`;
  return elemento;
}

function criarBlocosUsuarios(dataUsuarios) {
  const container = document.getElementById('div_informacoes_listar');
  container.innerHTML = '';

  dataUsuarios.forEach(usuario => {
    const blocoUsuario = document.createElement('div');
    blocoUsuario.classList.add('bloco_usuario');

    const nomeElemento = criarElementoUsuario('Nome', usuario.nome);
    const emailElemento = criarElementoUsuario('Email', usuario.email);
    const permissoesElemento = criarElementoUsuario('Lista de permissões', usuario.listaDePermissoes);
    const ultimaDataLoginElemento = criarElementoUsuario('Ultima data de Login', usuario.ultimaDataLogin);
    const statusAtivacaoElemento = criarElementoUsuario('Status de ativação', usuario.statusAtivacao);

    blocoUsuario.appendChild(nomeElemento);
    blocoUsuario.appendChild(emailElemento);
    blocoUsuario.appendChild(permissoesElemento);
    blocoUsuario.appendChild(ultimaDataLoginElemento);
    blocoUsuario.appendChild(statusAtivacaoElemento);

    container.appendChild(blocoUsuario);
  });
}