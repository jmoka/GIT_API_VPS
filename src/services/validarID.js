// Importa a configuração do banco de dados
import db from "../database/config.js";

// Função assíncrona para validar se o ID do usuário existe no banco de dados
async function validarIdUsuarios(id) {
    try {
        // Consulta o banco de dados para verificar se o ID do usuário existe
        const usuario = await db("usuarios").where({ id: id });

        // Se o usuário existir, retorna true, caso contrário, retorna false
        if (usuario.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // Caso ocorra algum erro, lança uma mensagem de erro
        throw new Error("Usuário não Encontrado");
    }
}

// Exporta a função para uso em outros módulos
export default validarIdUsuarios;
