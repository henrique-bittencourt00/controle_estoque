const nomeProdutoInput = document.getElementById('nomeProduto');
const qtdProdutoInput = document.getElementById('qtdProduto');
const cepFornecedorInput = document.getElementById('cepFornecedor');
const infoEndereco = document.getElementById('infoEndereco');
const btnBuscarCep = document.getElementById('btnBuscarCep');
const btnAdicionar = document.getElementById('btnAdicionar');
const corpoTabela = document.getElementById('corpoTabela');

let estoque = JSON.parse(localStorage.getItem('controleEstoque') || '[]');

function atualizarLocalStorage() {
  localStorage.setItem('controleEstoque', JSON.stringify(estoque));
}

function mostrarMensagem(texto, cor = '#2c3e50') {
  infoEndereco.innerText = texto;
  infoEndereco.style.color = cor;
}

function limparFormulario() {
  nomeProdutoInput.value = '';
  qtdProdutoInput.value = '';
  cepFornecedorInput.value = '';
}

function validarProduto(nome, quantidade) {
  if (!nome) {
    mostrarMensagem('Informe o nome do produto.', 'red');
    return false;
  }

  if (!quantidade || Number(quantidade) <= 0) {
    mostrarMensagem('Informe uma quantidade válida.', 'red');
    return false;
  }

  return true;
}

function renderizarTabela() {
  corpoTabela.innerHTML = '';

  if (estoque.length === 0) {
    corpoTabela.innerHTML = `
      <tr>
        <td colspan="4">Nenhum produto cadastrado.</td>
      </tr>
    `;
    return;
  }

  estoque.forEach((item, index) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.quantidade}</td>
      <td>${item.fornecedor || 'Não informado'}</td>
      <td><button class="btn-remover" data-index="${index}">Remover</button></td>
    `;
    corpoTabela.appendChild(linha);
  });
}

async function buscarEndereco() {
  const cep = cepFornecedorInput.value.trim();

  if (cep.length !== 8 || !/^[0-9]{8}$/.test(cep)) {
    mostrarMensagem('Por favor, digite um CEP com 8 números.', 'red');
    return;
  }

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      mostrarMensagem('CEP não encontrado!', 'red');
      return;
    }

    mostrarMensagem(`Endereço: ${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`, 'green');
  } catch (error) {
    mostrarMensagem('Erro ao buscar o endereço. Verifique sua conexão.', 'red');
  }
}

function adicionarProduto() {
  const nome = nomeProdutoInput.value.trim();
  const quantidade = qtdProdutoInput.value.trim();

  if (!validarProduto(nome, quantidade)) {
    return;
  }

  const nomeMaiusculo = nome.toUpperCase();
  const existe = estoque.some((item) => item.nome === nomeMaiusculo);

  if (existe) {
    mostrarMensagem('Produto já existe no estoque.', 'red');
    return;
  }

  const fornecedor = infoEndereco.innerText.startsWith('Endereço:')
    ? infoEndereco.innerText.replace('Endereço: ', '')
    : 'Não informado';

  estoque.push({ nome: nomeMaiusculo, quantidade, fornecedor });
  atualizarLocalStorage();
  renderizarTabela();
  limparFormulario();
  mostrarMensagem('Produto adicionado ao estoque com sucesso!', 'green');
}

function removerProduto(index) {
  estoque.splice(index, 1);
  atualizarLocalStorage();
  renderizarTabela();
  mostrarMensagem('Produto removido do estoque.', '#2c3e50');
}

btnBuscarCep.addEventListener('click', (event) => {
  event.preventDefault();
  buscarEndereco();
});

btnAdicionar.addEventListener('click', (event) => {
  event.preventDefault();
  adicionarProduto();
});

corpoTabela.addEventListener('click', (event) => {
  if (event.target.matches('.btn-remover')) {
    const index = Number(event.target.dataset.index);
    removerProduto(index);
  }
});

renderizarTabela();
