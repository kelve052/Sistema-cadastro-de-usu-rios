//funções que manipulão as ações dos botões de troca de ações

function hideAllSections() {
  const sections = document.querySelectorAll('.div_informacoes');
  sections.forEach(section => {
    section.style.display = 'none';
  });
}
hideAllSections()
document.getElementById('div_informacoes_home').style.display = 'block';


document.getElementById('btnCadastrarUsuario').addEventListener('click', function() {
  hideAllSections();
  document.getElementById('div_informacoes_cadastrar').style.display = 'block';
});

document.getElementById('btnEditarUsuario').addEventListener('click', function() {
  hideAllSections();
  document.getElementById('div_informacoes_editar').style.display = 'block';
});

document.getElementById('btnExcluirUsuario').addEventListener('click', function() {
  hideAllSections();
  document.getElementById('div_informacoes_excluir').style.display = 'block';
});

document.getElementById('btnFazerLogin').addEventListener('click', function() {
  hideAllSections();
  document.getElementById('div_informacoes_login').style.display = 'block';
});

document.getElementById('btnListarUsuarios').addEventListener('click', function() {
  hideAllSections();
  document.getElementById('div_informacoes_listar').style.display = 'block';
});

document.getElementById('btnFazerLogout').addEventListener('click', function() {
  hideAllSections();
  document.getElementById('div_informacoes_logout').style.display = 'block';
});

document.getElementById('btnAtivar').addEventListener('click', function() {
  hideAllSections();
  document.getElementById('div_informacoes_ativar').style.display = 'block';
});

document.getElementById('btnDesativar').addEventListener('click', function() {
  hideAllSections();
  document.getElementById('div_informacoes_desativar').style.display = 'block';
});

for (const btnCancelar of document.getElementsByClassName('botao_cancelar')) {
  btnCancelar.addEventListener('click', function() {
    hideAllSections();
    document.getElementById('div_informacoes_home').style.display = 'block';
  });
}











