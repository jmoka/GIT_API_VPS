// Importa a função para buscar um usuário pelo email
import { UsuarioEmail } from "./usuarioEmail.js";

// Importa a funcionalidade para gerar tokens JWT
import Token from "../../services/token.js";

// Importa a função para autenticar a senha usando um hash
import { autenticar } from "../../services/hash.js";

// Define a função assíncrona para autenticar o usuário
async function UsuarioLogado(dados = {}) {
    try {
        // Desestrutura o email e a senha dos dados fornecidos
        const { email, senha } = dados;
        // console.log(`Tentando autenticar usuário com email: ${email}`);

        // Busca o usuário no banco de dados pelo email
        const usuarioEncontrado = await UsuarioEmail(email);
        // console.log(`Status do usuário: ${usuarioEncontrado.status}`);

        // Verifica se o status do usuário é "ATIVO"
        if (usuarioEncontrado.status !== "ATIVO") {
            throw new Error("Usuário inativo."); // Se não estiver ativo, lança um erro
        }

        // Autentica a senha fornecida com a senha armazenada (hash)
        const senhaValida = await autenticar.autenticar(senha, usuarioEncontrado.senha);
        if (!senhaValida) {
            throw new Error("Senha incorreta."); // Se a senha não for válida, lança um erro
        }

        // Gera um token JWT para o usuário autenticado
        const tokenGerado = Token.gerarToken(usuarioEncontrado);
        console.log("Usuário autenticado com sucesso");
        return tokenGerado; // Retorna o token gerado
    } catch (error) {
        // console.error('Erro ao logar usuário:', error); // Loga o erro (opcional)
        throw new Error(error.message || "Erro ao logar usuário."); // Lança um erro com uma mensagem adequada
    }
}

// Exporta a função para que possa ser usada em outros módulos
export default UsuarioLogado;
