const supabase = require('./db/supabaseClient');

// READ — lista todos os produtos do banco
async function listarProduto() {
  const { data, error } = await supabase
    .from('produtos')
    .select('nome, quantidade')
    .order('nome', { ascending: true });

  if (error) {
    console.error('Erro ao listar:', error.message);
    return [];
  }
  return data;
}

module.exports = { listarProduto };
