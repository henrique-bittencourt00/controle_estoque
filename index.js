const readline = require('readline');
<<<<<<< HEAD
const estoqueService = require('./estoqueService');

=======
const fs = require('fs');
const { listarProduto: listarProdutoSupabase } = require('./estoqueRepo');
>>>>>>> a0eb4736019675afc4393a76cf67cd1b14ff3cef
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

<<<<<<< HEAD
function exibirMenu() {
=======
    if (posicao > -1){
        return false;
    } else {
        estoque.push({ nome: nomeMaiusculo, quantidade: quantidade});
        return true;
    }
}
function editarProduto (nomeAntigo, novoNome) {
    let posicao = estoque.findIndex(produto => produto.nome === nomeAntigo.toLocaleUpperCase())   
    if (posicao > -1){
        estoque[posicao].nome = novoNome.toLocaleUpperCase();
        return true;
    } else {
        return false;
    }
}
function listarProduto() {
    return estoque;
}
function excluirProduto(nomeProduto) {
    let posicao = estoque.findIndex(produto => produto.nome === nomeProduto.toUpperCase());
    if (posicao > -1) {
        estoque.splice(posicao, 1);  
        return true; 
    } else {
        return false; 
    }
}
function exibirMenu(){
>>>>>>> a0eb4736019675afc4393a76cf67cd1b14ff3cef
    console.log('1-Adicionar produto');
    console.log('2-Listar produto');
    console.log('3-Editar produto');
    console.log('4-Excluir produto');
    console.log('5-Sair');
    rl.question('Escolha uma opção:', (opcao) => {
        if (opcao === '1') {
            rl.question('Digite aqui o nome do produto: ', (nomeProduto) => {
                rl.question('Qual a quantidade do produto? ', (quantidade) => {
                    const sucesso = estoqueService.adicionarProduto(nomeProduto, quantidade);
                    if (sucesso) {
                        console.log('Produto adicionado ao estoque com sucesso!');
                    } else {
                        console.log('Produto já existe no estoque.');
                    }
                    exibirMenu();
                });
            });
        } else if (opcao === '2') {
            (async () => {
                const { listarProduto: listarProdutoSupabase } = require('./estoqueRepo');
                console.log('Seus produtos no estoque:');

                const lista = await listarProdutoSupabase();

                if (lista.length === 0) {
                    console.log('Não tem produtos no estoque');
                } else {
                    console.table(lista);
                }
                console.log('-------------------');
                exibirMenu();
            })();
        } else if (opcao === '3') {
            rl.question('Digite o nome do produto que você deseja editar: ', (produtoEditar) => {
                rl.question('Digite o novo nome do produto:', (novoNome) => {
                    const sucesso = estoqueService.editarProduto(produtoEditar, novoNome);
                    if (sucesso) {
                        console.log('Produto editado com sucesso');
                    } else {
                        console.log('Produto não encontrado no estoque');
                    }
                    exibirMenu();
                });
            });
        } else if (opcao === '4') {
            rl.question('Digite o nome do produto que deseja excluir:', (produtoRemover) => {
                const sucesso = estoqueService.excluirProduto(produtoRemover);
                if (sucesso) {
                    console.log('Produto removido');
                } else {
                    console.log('Produto não encontrado no estoque');
                }
                exibirMenu();
            });
        } else if (opcao === '5') {
            estoqueService.salvarEstoque();
            console.log('Backup salvo com sucesso. Saindo do Sistema');
            rl.close();
        } else {
            console.log('Opção inexistente, tente novamente');
            exibirMenu();
<<<<<<< HEAD
        }
    });
=======
        })();
    }

        exibirMenu();
      });
    } else if (opcao === '5') {
      estoqueService.salvarEstoque();
      console.log('Backup salvo com sucesso. Saindo do sistema.');
      rl.close();
    } else {
      console.log('Opção inexistente, tente novamente');
      exibirMenu();
    }
  });
>>>>>>> a0eb4736019675afc4393a76cf67cd1b14ff3cef
}

if (require.main === module) {
    exibirMenu();
}
<<<<<<< HEAD

module.exports = { rl };
=======
module.exports = {adicionarProduto, listarProduto, rl, editarProduto, excluirProduto, estoque};
>>>>>>> a0eb4736019675afc4393a76cf67cd1b14ff3cef
