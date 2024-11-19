import db from "../../database/config.js";  // Importa o módulo de banco de dados
import validarEmail from "../../services/validarEmail.js";  // Importa a função de validação de email
import { Usuario_ID } from "../Types/usuarioID.js";  // Importa a função para consultar o ID do usuário
import { criarHash } from "../../services/hash.js";  // Importa a função para criar hash da senha
import Token from "../../services/token.js";  // Importa o módulo para gerar tokens JWT

const perfilDefault = 4;  // Define um perfil padrão (pode ser utilizado se o perfil não for fornecido)

// Função para cadastrar um novo usuário
export default async function novoUsuario(user, req) {
    try {
        // Verifica se o e-mail já está cadastrado no banco de dados
        const emailExistente = await validarEmail(user.email);
        if (emailExistente) {
            throw new Error(`Usuário já cadastrado com esse email: ${user.email}`);
        }

        // Cria o hash da senha fornecida para garantir a segurança
        const senhaHash = await criarHash(user.senha);

        // Cria o objeto de usuário que será inserido no banco de dados
        const UsuarioEnviado = {
            nome: user.nome,
            email: user.email,
            senha: senhaHash,
            perfil: user.perfil || 4,
            status: user.status || "ATIVO"
        };

        // Insere o novo usuário no banco de dados
        const usuarioInserido = await db('usuarios').insert(UsuarioEnviado);
        // if (!usuarioInserido) throw new Error("Erro ao inserir usuario");
        console.log("usuarioInserido  " + typeof (usuarioInserido) + usuarioInserido);

        const usuario = await Usuario_ID(...usuarioInserido);
        console.log("usuario " + usuario);

        if (!usuario) throw new Error("Não foi possível retornar o usuário com esse ID.");

        // Gera o token JWT para o usuário recém-criado
        const token = Token.gerarToken(usuario);
        if (!token) throw new Error("Falha ao gerar o token");

        // Adiciona o token ao cabeçalho da requisição para autenticação futura
        req.headers = {
            authorization: `Bearer ${token}`
        };

        // Retorna o objeto do usuário inserido junto com o token
        return usuario, token;

    } catch (error) {
        // Caso ocorra algum erro, lança uma exceção com a mensagem do erro
        console.error('Erro ao criar usuário:', error);
        throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
}
