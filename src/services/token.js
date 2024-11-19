// Importa o pacote jwt para criar e verificar tokens
import jwt from "jsonwebtoken";

// É altamente recomendável armazenar o segredo em uma variável de ambiente
const SEGREDO_JWT = process.env.DB_SECRET;  // Substitua pelo seu segredo real e mantenha-o seguro

// Mensagem de erro padrão para token inválido ou expirado
const err = new Error("Token inválido ou expirado");

const Token = {
    // Função para gerar o token JWT
    gerarToken(usuario) {
        const agora = Math.floor(Date.now() / 1000); // Obtém o timestamp atual em segundos

        // Criação do payload que será assinado no token
        const payload = {
            id: usuario.id, // ID do usuário
            nome: usuario.nome, // Nome do usuário
            email: usuario.email, // Email do usuário
            status: usuario.status, // Status do usuário
            perfil: {
                nome: usuario.perfil.nome, // Nome do perfil
                rotulo: usuario.perfil.rotulo // Rótulo do perfil
            },
            iat: agora, // Timestamp do momento da emissão do token
            exp: agora + (24 * 60 * 60) // Token válido por 24 horas (em segundos)
        };

        // Assina o token com o segredo do servidor (não com a senha do usuário)
        const token = jwt.sign(payload, SEGREDO_JWT);

        // Retorna o payload junto com o token gerado
        return {
            ...payload,
            token
        };
    },

    // Função para verificar o token JWT
    verificarToken(token) {
        try {
            // Verifica e decodifica o token com o segredo do servidor
            const decoded = jwt.verify(token, SEGREDO_JWT);
            return decoded;
        } catch (error) {
            // Se houver erro (token inválido ou expirado), lança uma exceção
            throw err;
        }
    }
};

// Exporta o objeto com as funções para serem usadas em outros módulos
export default Token;
