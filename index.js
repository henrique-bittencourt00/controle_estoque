const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let estoque = [];
function exibirMenu(){
    console.log('1-Adicionar produto');
    console.log('2-Listar produto');
    console.log('4-Excluir produto');
    console.log('5-Sair');
    rl.question('Escolha uma opção:', (opcao) =>
        {if(opcao === '1'){
        rl.question('Digite aqui o nome do produto:', (nomeProduto) => {
            let nomeMaiusculo = nomeProduto.toUpperCase();
            if(estoque.includes(nomeMaiusculo)){
                console.log('Produto ja existe no estoque');
            } else {
                estoque.push(nomeMaiusculo); 
                    console.log('Produto adicionado ao estoque com sucesso');
            }
            exibirMenu();
        });
        }
    else if(opcao === '2'){
        console.log('Você escolheu listar os produtos');
        console.log('Seus produtos no estoque');
        if(estoque.length === 0){
            console.log('Não tem produtos no estoque');
        } else {
            {
               console.log(estoque.join ('-'));
            }
        }
        console.log('-------------------');
        exibirMenu();
    }
    
        else if(opcao === '4'){
            rl.question('Digite o nome do produto que deseja excluir:', (produtoRemover) => {
            let posicao = estoque.indexOf(produtoRemover.toUpperCase());
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
        console.log('Saindo do sistema');
        rl.close();
}
    else {
        console.log('Opção inexistente, tente novamente');
       exibirMenu();
    }
});
}
exibirMenu();