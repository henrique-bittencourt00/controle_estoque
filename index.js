const readline = require('readline');
const fs = require('fs');
const { listarProduto } = require('./estoqueRepo');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
    console.log('1-Adicionar produto');
    console.log('2-Listar produto');
    console.log('3-Editar produto');
    console.log('4-Excluir produto');
    console.log('5-Sair');
    rl.question('Escolha uma opção:', (opcao) => {
        if (opcao === '1') {
            rl.question('Digite aqui o nome do produto: ', (nomeProduto) => {
                rl.question('Qual a quantidade do produto? ', (quantidade) => {
                    let sucesso = adicionarProduto(nomeProduto, quantidade);

                    if (sucesso) {
                        console.log('Produto adicionado ao estoque com sucesso!');
                    } else {
                        console.log('Produto já existe no estoque.');
                    }
                    
                    exibirMenu(); 
                });
            });
        }
    
    
    else if(opcao === '2'){
        (async () => {
            console.log('Você escolheu listar os produtos');
            console.log('Seus produtos no estoque');

            let lista = await listarProduto();

            if(lista.length === 0){
                console.log('Não tem produtos no estoque');
            } else {
                console.table(lista);
            }
            console.log('-------------------');
            exibirMenu();
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
}

if (require.main === module) {
  exibirMenu();
}
module.exports = {adicionarProduto, rl, editarProduto, excluirProduto, estoque};
