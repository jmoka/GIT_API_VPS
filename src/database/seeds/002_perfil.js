/**
 * Função para inserir dados iniciais na tabela 'perfis'
 * @param { import("knex").Knex } knex - A instância do knex
 * @returns { Promise<void> } - Função assíncrona que retorna uma promise
 */
export const seed = async (knex) => {
  try {
    // Limpa a tabela 'perfis' antes de inserir novos dados
    await knex('perfis').del();

    // Definindo os perfis que serão inseridos
    const perfis = [
      { nome: "mast", rotulo: "Master" },
      { nome: "dev", rotulo: "Developer" },
      { nome: "admin", rotulo: 'Administrador' },
      { nome: "user", rotulo: 'Usuário' },
    ];

    // Insere os perfis na tabela 'perfis'
    await knex('perfis').insert(perfis);

    console.log("Perfis inseridos com sucesso!");
  } catch (error) {
    console.error('Erro ao rodar o seed dos perfis:', error);
    throw new Error('Erro ao inserir os dados dos perfis.');
  }
};
