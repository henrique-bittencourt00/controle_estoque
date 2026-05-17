
async function buscarEndereco() {
   
    const cep = document.getElementById('cepFornecedor').value;
    const campoInfo = document.getElementById('infoEndereco');

    if (cep.length !== 8) {
        campoInfo.innerText = "Por favor, digite um CEP com 8 números.";
        return;
    }

    try {
        
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
         
        const dados = await resposta.json();

        if (dados.erro) {
            campoInfo.innerText = "CEP não encontrado!";
        } else {
            
            campoInfo.innerText = `Endereço: ${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`;
            campoInfo.style.color = "green";
        }
    } catch (error) {
        
        campoInfo.innerText = "Erro ao buscar o endereço. Verifique sua conexão.";
        campoInfo.style.color = "red";
    }
}


document.getElementById('btnBuscarCep').addEventListener('click', buscarEndereco);