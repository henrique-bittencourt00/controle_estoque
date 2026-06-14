test('Deve retornar o endereço correto ao consultar um CEP válido', async () => {
    const cep = '01001000'; // CEP da Praça da Sé
    const url = `https://viacep.com.br/ws/${cep}/json/`;


    const resposta = await fetch(url);
    const dados = await resposta.json();


    expect(resposta.status).toBe(200);
    expect(dados.logradouro).toBe('Praça da Sé');
    expect(dados.localidade).toBe('São Paulo');
});