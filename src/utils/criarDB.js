import dotenv from 'dotenv'; // Importando dotenv usando ES Modules
import mysql from 'mysql2'; // Importando a biblioteca mysql2

dotenv.config(); // Carregando variáveis de ambiente

// Função de conexão sem banco de dados especificado
function conexaoSemDB() {
    const dadosConexao = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    };

    const conectar = mysql.createConnection(dadosConexao); // estabelece a conexao com o banco de dados

    // verifica se a conexao foi estabelecida e retorna a conexão
    conectar.connect((err) => {
        if (err) {
            console.error("Erro ao conectar ao MySQL: " + err.message);
            return;
        }
    });

    return conectar;
}

// Função de conexão com o banco de dados
export default function conexaoComDB() {
    const dadosConexao = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    };

    const conectar = mysql.createConnection(dadosConexao); // estabelece a conexao com o banco de dados

    // verifica se a conexao foi estabelecida e retorna a conexão
    conectar.connect((err) => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados: " + err.message);
            return;
        }
        console.log("Conexão estabelecida com sucesso ao banco de dados.");
    });

    return conectar;
}

// cria a base de dados 
export async function criarBaseDados() {
    const conectar = conexaoSemDB(); // Conectar sem especificar o banco de dados
    const dbName = "baseCliente"; // Nome do banco de dados

    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`; // atribui a variavel createDatabaseQuery o sql para criar a base de dados

    // conecta a base e efetua a query de criação de base de dados , recebedo o erro ou o resultado
    conectar.query(createDatabaseQuery, (err, result) => {
        if (err) {
            console.error("Erro ao criar a base de dados: " + err.message);
        } else {
            console.log(`Base de dados '${dbName}' criada ou já existe.`);
        }
        conectar.end(); // Fechar a conexão após a criação do banco

        // Agora conecte com o banco de dados
        const conectarComDB = conexaoComDB();
        conectarComDB.end(); // Fechar a conexão após usá-la
    });
}

// testar a criação do banco de dados
// criarBaseDados();
