import { UsuarioEmail } from "../Types/usuarioEmail.js";
import Token from "../../services/token.js";
import { autenticar } from "../../services/hash.js";

async function logarUsuario(dados, req) {
    const errSenhaEmail = new Error("Email ou senha não cadastrado!");
    const erroInativo = new Error("Usuário Inativo");
    const erroUsuario = new Error("Usuário não Definido");

    try {
        const { email, senha } = dados;

        // Normaliza e remove espaços do email
        const normalizedEmail = email.trim().toLowerCase();

        // Log do e-mail recebido para depuração
        console.log("Email recebido:", email);
        console.log("Email normalizado:", normalizedEmail);

        // Busca o usuário no banco de dados pelo email
        const usuarioEncontrado = await UsuarioEmail(normalizedEmail);

        // Log do usuário encontrado para depuração
        console.log("Usuario Encontrado:", usuarioEncontrado);

        if (!usuarioEncontrado) throw errSenhaEmail; // checa se existe o usuario 
        if (usuarioEncontrado.status !== "ATIVO") throw erroInativo; // checa se o estatus esta ativo

        // Verifica a comparação de senha

        const senhaValida = await autenticar(senha, usuarioEncontrado.senha);
        console.log("Senha Válida:", senhaValida);

        if (!senhaValida) throw errSenhaEmail;

        const token = Token.gerarToken(usuarioEncontrado);
        req.headers = {
            authorization: `Bearer ${token}`
        };

        const dadosToken = {
            iat: token.iat,
            exp: token.exp,
            token: token.token
        };

        return { ...usuarioEncontrado, ...dadosToken };

    } catch (e) {
        console.error("Erro:", e);  // Log do erro real
        throw erroUsuario;  // Lança um erro genérico para o cliente
    }
}

export { logarUsuario };
