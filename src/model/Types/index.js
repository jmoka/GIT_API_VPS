// Importa funções que lidam com consultas específicas relacionadas a usuários
import TodosUsuarios from "./todosUsuarios.js"; // Consulta para buscar todos os usuários
import UsuarioNome from "./usuarioNome.js";     // Consulta para buscar usuário por nome
import { UsuarioID } from "./usuarioID.js";     // Consulta para buscar usuário por ID
import UsuarioLogado from "./loginUsuario.js";  // Consulta para verificar se o usuário está logado
import { UsuarioEmail } from "./usuarioEmail.js";   // Importação nomeada

import UsuarioEmailConsulta from "./usuarioEmailConsulta.js"; // Outra consulta por email

// Definição dos resolvers de GraphQL
const resolvers = {
    // Retorna todos os usuários ao chamar a função TodosUsuarios
    usuarios() {
        return TodosUsuarios();
    },

    // Retorna um usuário com base no ID fornecido
    usuarioID(_, { id }) {
        return UsuarioID(id);
    },

    // Retorna um usuário com base no nome fornecido
    usuarioNome(_, { nome }) {
        return UsuarioNome(nome);
    },

    // Retorna um usuário com base no email fornecido
    usuarioEmail(_, { email }) {
        return UsuarioEmail(email);
    },

    // Retorna uma consulta específica de usuário com base no email
    usuarioEmailConsulta(_, { email }) {
        return UsuarioEmailConsulta(email);
    },

    // Retorna um usuário logado com base nos dados fornecidos (autenticação)
    UsuarioLogado(_, { dados }) {
        return UsuarioLogado(dados);
    }
};

// Exporta os resolvers para uso em outros módulos
export default resolvers;
