// Importa o módulo de banco de dados configurado
import db from "../../database/config.js";

// Importa a função `format` da biblioteca `date-fns` para formatar datas
import { format } from "date-fns";

// Define a função assíncrona que consulta todos os usuários e seus perfis
async function TodosUsuarios() {
    try {
        // Consulta o banco de dados "usuarios" com um left join na tabela "perfis"
        const usuarios = await db("usuarios")
            .leftJoin("perfis", "usuarios.perfil", "=", "perfis.id") // Usa leftJoin para incluir usuários sem perfil
            .select(
                "usuarios.id",
                "usuarios.nome",
                "usuarios.email",
                "usuarios.status",
                "usuarios.data_criacao",
                "perfis.id as perfil_id", // Seleciona o id do perfil, se existir
                "perfis.nome as perfil_nome", // Nome do perfil
                "perfis.rotulo as perfil_rotulo" // Rótulo do perfil
            );

        // Verifica se há usuários retornados; caso contrário, lança um erro
        if (!usuarios || usuarios.length === 0) {
            throw new Error("Não foi possível retornar nenhum usuário ou a tabela está vazia");
        }

        // Mapeia os resultados para o formato esperado pelo GraphQL
        const resultado = usuarios.map(usuario => ({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            status: usuario.status,
            dataCriacao: format(new Date(usuario.data_criacao), 'yyyy-MM-dd HH:mm:ss'), // Formata a data
            perfil: {
                id: usuario.perfil_id || "ID Perfil não definido", // Retorna texto padrão se não houver id perfil
                nome: usuario.perfil_nome,
                rotulo: usuario.perfil_rotulo
            }
        }));

        // Retorna os usuários no formato desejado
        return resultado;
    } catch (error) {
        // Em caso de erro, retorna uma instância de Error com uma mensagem genérica
        return new Error("Não foi possível retornar nenhum usuário");
    }
}

// Exporta a função para uso em outros módulos do projeto
export default TodosUsuarios;
