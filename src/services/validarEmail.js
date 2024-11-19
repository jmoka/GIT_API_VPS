// Importa a configuração do banco de dados
import db from "../database/config.js";

// Função assíncrona para validar se o email existe no banco de dados
async function validarEmail(email) {
    try {
        // Consulta todos os usuários no banco de dados
        const usuarios = await db("usuarios");

        // Verifica se o email existe no array de usuários
        const EmailEncontrado = usuarios.filter(u => u.email === email).length > 0;

        return EmailEncontrado;
    } catch (error) {
        // Caso ocorra algum erro, lança uma mensagem de erro
        throw new Error("Algo deu errado, verifique sua conexão com o banco de dados");
    }
}

// Exporta a função para uso em outros módulos
export default validarEmail;
