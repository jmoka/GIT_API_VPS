// Importa as mutações relacionadas aos usuários utilizando import
import { logarUsuario } from "./logarUsuario_mutation.js";
import novoUsuario from "./novoUsuario_mutation.js";
import { alterarUsuario } from "./atualizarUsuario_mutation.js";
import { excluirUsuario } from "./excluirUsuario_mutation.js";

// Importa a função para extrair informações do contexto da requisição (provavelmente para decodificar tokens)
import { extrairObjDecoder } from "../../services/extrairContext.js";

const mutations = {
    // Função de mutação para criar um novo usuário
    novoUsuario(_, { user }, req) {
        // Chama a função 'novoUsuario' passando os dados do usuário e o contexto da requisição
        return novoUsuario(user, req);
    },

    // Função de mutação para alterar os dados de um usuário existente
    alterarUsuario(_, { user, filtro }) {
        // Chama a função 'alterarUsuario' passando os dados do usuário e o filtro para identificar o usuário a ser alterado
        return alterarUsuario(user, filtro);
    },

    // Função de mutação para excluir um usuário
    excluirUsuario(_, { filtro }) {
        // Chama a função 'excluirUsuario' passando o filtro para identificar o usuário a ser excluído
        return excluirUsuario(filtro);
    },

    // Função de mutação para fazer login de um usuário
    loginUsuario(_, { dados }, { req }) {
        // Chama a função 'logarUsuario' passando os dados de login e o contexto da requisição
        return logarUsuario(dados, req);
    }
};
export default mutations;