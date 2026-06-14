const readline = require('readline');
const estoqueService = require('./estoqueService');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function exibirMenu() {
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
        }
    });
}

if (require.main === module) {
    exibirMenu();
}

module.exports = { rl };
