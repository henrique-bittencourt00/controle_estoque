const fs = require('fs');
const path = require('path');

const estoquePath = path.resolve(__dirname, '..', 'estoque.json');

function carregarEstoque() {
  try {
    const arquivo = fs.readFileSync(estoquePath, 'utf-8');
    return JSON.parse(arquivo);
  } catch (error) {
    return [];
  }
}

function salvarEstoque(estoque) {
  fs.writeFileSync(estoquePath, JSON.stringify(estoque, null, 2), 'utf-8');
}

module.exports = {
  carregarEstoque,
  salvarEstoque,
};
