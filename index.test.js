const{ adicionarProduto, rl, listarProduto, excluirProduto, editarProduto} = require('./index');
test('Deve adicionar um produto novo com sucesso', () => {
    const sucesso = adicionarProduto('FEIJÃO', '12');
    expect(sucesso).toBe(true);
});
test('O produto deve ir para a lista de estoque',() =>{
    adicionarProduto('ARROZ', '10');
    const meuEstoque = listarProduto();
    const ultimoProduto = meuEstoque[meuEstoque.length -1];
    expect(ultimoProduto.nome).toBe('ARROZ');
    expect(ultimoProduto.quantidade).toBe('10');
});
test('Não deve permitir adicionar produto repetido', () =>{
    adicionarProduto('MAÇÃ', '2');
    const tentativaRepetida = adicionarProduto('MAÇÃ', '6');
    expect(tentativaRepetida).toBe(false);
});
test('Excluir produto com sucesso', () => {
    adicionarProduto('BISCOITO', '5');
    const sucesso = excluirProduto('BISCOITO');
    expect(sucesso).toBe(true);
});
test('Não deve exluir um produto que não existe no estoque', () =>{
    const sucesso = excluirProduto('BOLA_DE_FUTEBOL');
    expect(sucesso).toBe(false);
});
test('Deve editar o nome do produto existente', () => {
    adicionarProduto('MARACUJA', '9');
    const sucesso = editarProduto('MARACUJA', 'MARACUJAINA');
    expect(sucesso).toBe(true);
    const estoque = listarProduto();
    const produtoEditado = estoque.find(p => p.nome === 'MARACUJAINA');
    expect(produtoEditado).toBeDefined();
});
test('Não deve editar um produto que não existe no estoque', () => {
    const sucesso = editarProduto('INEXISTENTE', 'SEM_NOME');
    expect(sucesso).toBe(false);
});
afterAll(() =>{
    rl.close();
});
