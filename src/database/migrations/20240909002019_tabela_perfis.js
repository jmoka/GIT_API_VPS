// Importa o tipo Knex (se necessário)
import knex from 'knex';

/**
 * Função responsável por aplicar a migração para criar a tabela 'perfis'.
 * @param { import("knex").Knex } knex - Objeto Knex para interagir com o banco de dados.
 * @returns { Promise<void> } - Retorna uma promessa que indica a conclusão da migração.
 */
export const up = function (knex) {
    return knex.schema
        // Criação da tabela 'perfis'
        .createTable('perfis', table => {
            // Criação do campo 'id' como chave primária (auto-incremento)
            table.increments('id').primary();

            // Criação do campo 'nome', com tamanho máximo de 255 caracteres,
            // que não pode ser nulo e deve ser único (não aceita duplicados)
            table.string('nome', 255).notNullable().unique();

            // Criação do campo 'rotulo', com tamanho máximo de 255 caracteres,
            // que não pode ser nulo e também deve ser único (não aceita duplicados)
            table.string('rotulo', 255).notNullable().unique();
        })
};

/**
 * Função responsável por desfazer a migração e excluir a tabela 'perfis'.
 * @param { import("knex").Knex } knex - Objeto Knex para interagir com o banco de dados.
 * @returns { Promise<void> } - Retorna uma promessa que indica a conclusão da exclusão da tabela.
 */
export const down = function (knex) {
    return knex.schema.dropTable('perfis'); // Exclui a tabela 'perfis' caso a migração seja revertida
};

// Desativa a transação para essa migração específica. 
// Isso significa que, se ocorrer algum erro, as alterações não serão revertidas automaticamente.
export const config = { transaction: false };
