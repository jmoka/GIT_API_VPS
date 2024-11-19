import dotenv from 'dotenv';
dotenv.config(); // Carregar variáveis de ambiente

// Agora, o knexfile.js exporta a configuração usando export
import config from '../../knexfile.js';

// Importa o módulo knex para trabalhar com o banco de dados
import knex from 'knex';

// Define a variável 'env' para pegar o ambiente de execução (desenvolvimento ou produção) a partir da variável de ambiente 'NODE_ENV', ou usa 'production' como padrão
const env = process.env.NODE_ENV || 'development';

// Se o ambiente for 'development', exibe um log indicando que está em desenvolvimento
if (env === 'development') {
    console.log('Está em Desenvolvimento');
}

// Se o ambiente for 'production', exibe um log indicando que está em produção
if (env === 'production') {
    console.log('Está em Produção');
}

let db;

try {
    // Tenta criar uma conexão com o banco de dados utilizando as configurações específicas para o ambiente
    db = knex(config[env]);
    console.log(`Banco de Dados Conectado`); // Exibe um log de sucesso ao conectar
} catch (error) {
    // Caso ocorra um erro na conexão, exibe a mensagem de erro e encerra o processo com código 1 (erro)
    console.error('Erro ao conectar ao banco de dados:', error.message);
    process.exit(1);
}

// Exporta a conexão com o banco de dados para ser usada em outros módulos
export default db;
