// Importa a configuração do banco de dados
import db from "../database/config.js";

// Função assíncrona para validar se o nome do usuário já existe no banco de dados
async function validarNomeUsuarios(nome) {
    try {
        // Consulta o banco de dados para verificar se o nome já existe
        const usuario = await db("usuarios").where({ nome: nome });

        // Se o usuário existir, retorna true, caso contrário, retorna false
        if (usuario.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // Caso ocorra algum erro, lança uma mensagem de erro
        throw new Error("Informe um valor válido");
    }
}

// Exporta a função para uso em outros módulos
export default validarNomeUsuarios;
