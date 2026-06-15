const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function listarProdutos() {
    const { data, error } = await db
        .from('produtos')
        .select('id, nome, quantidade')
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
            <td><button onclick="excluirProduto('${p.id}', '${p.nome}')" class="btn-delet">Excluir</button>
                <button onclick="editarProduto('${p.id}', '${p.nome}', '${p.quantidade}')" class="btn-edit">Editar</button>
            </td>
            
        `;
        tbody.appendChild(tr);
    });
}

function renderizarModal(titulo, conteudoHTML, acaoConfirmar) {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').innerText = titulo;
    document.getElementById('modalBodyText').innerHTML = conteudoHTML;

    const btnConfirmar = document.getElementById('btnModalConfirmar');

    const novoBtnConfirmar = btnConfirmar.cloneNode(true);
    btnConfirmar.parentNode.replaceChild(novoBtnConfirmar, btnConfirmar);

    novoBtnConfirmar.addEventListener('click', async () => {
        const sucesso = await acaoConfirmar();
        if (sucesso !== false) {
            fecharModal();
        }
    });

    modal.style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

async function adicionarProduto() {
    const nome = document.getElementById('nomeProduto').value.trim().toUpperCase();
    const quantidade = document.getElementById('qtdProduto').value.trim();
    const campoInfo = document.getElementById('infoEndereco');

    if (!nome || !quantidade) {
        Swal.fire('Atenção!', 'Preencha o nome e a quantidade.', 'warning');
        return;
    }

    const { error } = await db.from('produtos').insert({ nome, quantidade });

    if (error) {
        console.error('Erro ao adicionar:', error.message);
        Swal.fire('Erro!', 'Erro ao adicionar produto: ' + error.message, 'error');
        return;
    }

    Swal.fire('Sucesso!', 'Produto adicionado com sucesso!', 'success');

    document.getElementById('nomeProduto').value = '';
    document.getElementById('qtdProduto').value = '';
    document.getElementById('cepFornecedor').value = '';
    campoInfo.textContent = '';

    await listarProdutos();
}

// Só salva no banco
async function salvarEdicao(idProduto) {
    const novoNome = document.getElementById('editNome').value.trim().toUpperCase();
    const novaQtd = document.getElementById('editQtd').value.trim();

    if (!novoNome || !novaQtd) {
        Swal.fire('Atenção!', 'Por favor, preencha o nome e a quantidade.', 'warning');
        return false;
    }
    const { error } = await db.from('produtos')
        .update({ nome: novoNome, quantidade: novaQtd })
        .eq('id', idProduto);

    if (error) {
        Swal.fire('Erro!', 'Erro ao editar produto: ' + error.message, 'error');
        return true;
    }


    Swal.fire('Feito!', 'Produto atualizado com sucesso!', 'success');
    return true;
    await listarProdutos();
}

// Só monta o modal e chama a função pra salvar
function editarProduto(idProduto, nomeAtual, qtdAtual) {
    const formHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="font-weight: bold; color: #333;">Nome do Produto:</label>
            <input type="text" id="editNome" value="${nomeAtual}" class="modal-input">
            
            <label style="font-weight: bold; color: #333; margin-top: 10px;">Quantidade em Estoque:</label>
            <input type="number" id="editQtd" value="${qtdAtual}" class="modal-input">
        </div>
    `;

    // Renderiza o modal
    renderizarModal(
        'Editar Produto',
        formHTML,
        () => salvarEdicao(idProduto)
    );
}

function excluirProduto(idProduto, nome) {
    renderizarModal(
        'Confirmar Exclusão',
        `Tem a certeza que deseja excluir o produto "${nome}"?`,
        async () => {
            const { error } = await db.from('produtos').delete().eq('id', idProduto);

            if (error) {
                Swal.fire('Erro!', 'Erro ao excluir produto: ' + error.message, 'error');
                return true;
            }

            Swal.fire('Apagado!', 'Produto removido com sucesso!', 'success');
            await listarProdutos();
            return true;
        }
    );
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
}

document.getElementById('btnBuscarCep').addEventListener('click', buscarEndereco);
document.getElementById('btnAdicionar').addEventListener('click', adicionarProduto);

listarProdutos();