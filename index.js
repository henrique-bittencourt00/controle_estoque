const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let estoque = [];
if (fs.existsSync('estoque.json')) {
    let dadosDoArquivo = fs.readFileSync('estoque.json', 'utf-8');
    estoque = JSON.parse(dadosDoArquivo);
}
function exibirMenu(){
    console.log('1-Adicionar produto');
    console.log('2-Listar produto');
    console.log('3-Editar produto');
    console.log('4-Excluir produto');
    console.log('5-Sair');
    rl.question('Escolha uma opção:', (opcao) =>
        {if(opcao === '1'){
        rl.question('Digite aqui o nome do produto:', (nomeProduto) => {
            let nomeMaiusculo = nomeProduto.toUpperCase();
            let posicao = estoque.findIndex(produto => produto.nome === nomeMaiusculo);
                if(posicao > -1) {
                console.log('Produto ja existe no estoque');
                exibirMenu();
            }
            
                else {
                rl.question('Qual a quantidade de produto?', (quantidade) =>{
                    estoque.push({nome: nomeProduto.toUpperCase(), quantidade: quantidade})
                    console.log('Produto adicionado ao estoque com sucesso');
                    exibirMenu();
            })
             }
        });
        }
    
    else if(opcao === '2'){
        console.log('Você escolheu listar os produtos');
        console.log('Seus produtos no estoque');
        if(estoque.length === 0){
            console.log('Não tem produtos no estoque');
        } else {
          for (let i = 0; i < estoque.length; i++) {
          console.log(`${i + 1}. Produto: ${estoque[i].nome} | Quantidade: ${estoque[i].quantidade}`);
        }
        }
        console.log('-------------------');
        exibirMenu();
    }

    else if(opcao === '3'){
        rl.question('Digite o nome do produto que você deseja editar:', (produtoEditar) => {
            let posicao = estoque.findIndex(produto => produto.nome === produtoEditar.toLocaleUpperCase());
            if(posicao > -1){
                console.log('Produto encontrado no estoque');
                rl.question('Digite o novo nome do Produto:', (novoProduto) => {
                    estoque[posicao].nome = novoProduto.toUpperCase();
                    console.log('Produto editado');
                    exibirMenu();
                })
            }
            else {
                console.log('Produto não encontrado no estoque'); 
                 exibirMenu();

             }
            
        })
    }
    
        else if(opcao === '4'){
            rl.question('Digite o nome do produto que deseja excluir:', (produtoRemover) => {
            let posicao = estoque.findIndex(produto => produto.nome === produtoRemover.toUpperCase());
            if(posicao > -1){
                estoque.splice(posicao,1);  
             console.log('Produto removido!');
            }    
             else {
            console.log ('Produto não encontrado no estoque');
           
                }
            exibirMenu();
            })
        }
    
     else if(opcao === '5'){
        console.log('Salvando backup');
        let estoqueEmTexto = JSON.stringify(estoque);
        fs.writeFileSync('estoque.json', estoqueEmTexto);
        console.log('Backup salvo com sucesso. Saindo do Sistema')
        rl.close();
}
    else {
        console.log('Opção inexistente, tente novamente');
       exibirMenu();
    }
});
}
exibirMenu();