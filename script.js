const SUPABASE_URL = 'https://kavbbgkglxgbczxlxesd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthdmJiZ2tnbHhnYmN6eGx4ZXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NDU2NzgsImV4cCI6MjA5NzAyMTY3OH0.Na9ESFr-nummMBuCm-a--7L3ILFLhhyZfPCSn4JWPsM';

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function listarProdutos() {
    const { data, error } = await db
        .from('produtos')
        .select('nome, quantidade')
        .order('nome', { ascending: true });

    if (error) {
        console.error('Erro ao listar:', error.message);
        return;
    }

    renderizarTabela(data);
}

function renderizarTabela(produtos) {
    const tbody = document.getElementById('corpoTabela');
    tbody.innerHTML = '';

    if (produtos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Nenhum produto cadastrado</td></tr>';
        return;
    }

    produtos.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.nome}</td>
            <td>${p.quantidade}</td>
            <td>${p.cidade || '-'}</td>
            <td><button onclick="excluirProduto('${p.nome}')">Excluir</button></td>
        `;
        tbody.appendChild(tr);
    });
}

async function adicionarProduto() {
    const nome = document.getElementById('nomeProduto').value.trim().toUpperCase();
    const quantidade = document.getElementById('qtdProduto').value.trim();
    const campoInfo = document.getElementById('infoEndereco');

    if (!nome || !quantidade) {
        alert('Preencha o nome e a quantidade.');
        return;
    }

    const { error } = await db.from('produtos').insert({ nome, quantidade });

    if (error) {
        console.error('Erro ao adicionar:', error.message);
        alert('Erro ao adicionar produto: ' + error.message);
        return;
    }

    document.getElementById('nomeProduto').value = '';
    document.getElementById('qtdProduto').value = '';
    document.getElementById('cepFornecedor').value = '';
    campoInfo.textContent = '';

    await listarProdutos();
}

async function excluirProduto(nome) {
    const { error } = await db.from('produtos').delete().eq('nome', nome);

    if (error) {
        console.error('Erro ao excluir:', error.message);
        return;
    }

    await listarProdutos();
}

async function buscarEndereco() {
    const cep = document.getElementById('cepFornecedor').value;
    const campoInfo = document.getElementById('infoEndereco');

    if (cep.length !== 8) {
        campoInfo.innerText = 'Por favor, digite um CEP com 8 números.';
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            campoInfo.innerText = 'CEP não encontrado!';
        } else {
            campoInfo.innerText = `Endereço: ${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`;
            campoInfo.style.color = 'green';
        }
    } catch (error) {
        campoInfo.innerText = 'Erro ao buscar o endereço. Verifique sua conexão.';
        campoInfo.style.color = 'red';
    }

    try {
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

document.getElementById('btnBuscarCep').addEventListener('click', buscarEndereco);
document.getElementById('btnAdicionar').addEventListener('click', adicionarProduto);

listarProdutos();
