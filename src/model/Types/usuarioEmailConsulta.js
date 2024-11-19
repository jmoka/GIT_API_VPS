// Importa o módulo de banco de dados configurado
import db from "../../database/config.js";

// Importa a função `format` da biblioteca `date-fns` para formatar datas
import { format } from "date-fns";

// Define a função assíncrona `UsuarioEmailConsulta` que busca um usuário pelo email
async function UsuarioEmailConsulta(email) {
    try {
        // Realiza a consulta no banco de dados "usuarios" com um left join na tabela "perfis"
        const usuarioEmail = await db("usuarios")
            .leftJoin("perfis", "usuarios.perfil", "=", "perfis.id") // Utiliza leftJoin para incluir usuários que não tenham perfil
            .select(
                "usuarios.id",
                "usuarios.nome",
                "usuarios.email",
                "usuarios.senha",
                "usuarios.status",
                "usuarios.data_criacao",
                "perfis.nome as perfil_nome",  // Renomeia o nome do perfil
                "perfis.rotulo como perfil_rotulo" // Renomeia o rótulo do perfil
            )
            .where({ "usuarios.email": email }) // Filtra o usuário com base no email fornecido
            .first(); // Retorna apenas o primeiro registro encontrado

        // Verifica se o usuário foi encontrado e formata o resultado no formato esperado pelo GraphQL
        const resultado = {
            id: usuarioEmail.id,
            nome: usuarioEmail.nome,
            email: usuarioEmail.email,
            senha: usuarioEmail.senha,
            status: usuarioEmail.status,
            dataCriacao: format(new Date(usuarioEmail.data_criacao), 'yyyy-MM-dd HH:mm:ss'), // Formata a data
            perfil: {
                nome: usuarioEmail.perfil_nome,
                rotulo: usuarioEmail.perfil_rotulo
            }
        };

        // Retorna o objeto com as informações do usuário e do perfil formatadas
        return resultado;
    } catch (error) {
        // Exibe uma mensagem de erro no console se o usuário não for encontrado ou se ocorrer outro erro
        console.error("Usuário com o email informado não está cadastrado!!");
        // Lança um erro com uma mensagem específica que pode ser capturada por quem chamou a função
        throw new Error("Usuário com o email informado não está cadastrado!!");
    }
}

// Exporta a função `UsuarioEmailConsulta` para que ela possa ser utilizada em outros módulos
export default UsuarioEmailConsulta;
