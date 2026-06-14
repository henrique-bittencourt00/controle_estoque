const estoqueRepo = require('./db/estoqueRepo');

let estoque = estoqueRepo.carregarEstoque();

function adicionarProduto(nome, quantidade) {
  const nomeMaiusculo = nome.toUpperCase();
  const posicao = estoque.findIndex((produto) => produto.nome === nomeMaiusculo);

  if (posicao > -1) {
    return false;
  }

  estoque.push({ nome: nomeMaiusculo, quantidade });
  return true;
}

function editarProduto(nomeAntigo, novoNome) {
  const nomeAntigoMaiusculo = nomeAntigo.toUpperCase();
  const posicao = estoque.findIndex((produto) => produto.nome === nomeAntigoMaiusculo);

  if (posicao > -1) {
    estoque[posicao].nome = novoNome.toUpperCase();
    return true;
  }

  return false;
}

function excluirProduto(nomeProduto) {
  const posicao = estoque.findIndex((produto) => produto.nome === nomeProduto.toUpperCase());

  if (posicao > -1) {
    estoque.splice(posicao, 1);
    return true;
  }

  return false;
}

function listarProduto() {
  return [...estoque];
}

function salvarEstoque() {
  estoqueRepo.salvarEstoque(estoque);
}

function resetEstoque() {
  estoque = [];
}

module.exports = {
  adicionarProduto,
  editarProduto,
  excluirProduto,
  listarProduto,
  salvarEstoque,
  resetEstoque,
};
