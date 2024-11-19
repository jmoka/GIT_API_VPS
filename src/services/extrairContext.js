// Importa o pacote 'jsonwebtoken' para trabalhar com tokens JWT
import jwt from 'jsonwebtoken';

// Função para extrair o token de autorização do contexto da requisição
function extrairTokenContext(ctx) {
    console.log("Iniciando extrairTokenContext");

    // Verifica se o contexto ou a requisição não são encontrados
    if (!ctx || !ctx.req || !ctx.req.headers) {
        console.log("Contexto ou requisição não encontrados");
        throw new Error("Requisição inválida ou contexto não disponível");
    }

    // Pega o cabeçalho de autorização da requisição
    const authHeader = ctx.req.headers.authorization;

    // Verifica se o cabeçalho de autorização não está presente
    if (!authHeader) {
        console.log("Cabeçalho de autorização não encontrado");
        throw new Error("Token não encontrado");
    }

    // Remove o prefixo 'Bearer ' do cabeçalho de autorização para pegar apenas o token
    const token = authHeader.replace('Bearer ', '');

    // Verifica se o token foi encontrado após a remoção do prefixo
    if (!token) {
        throw new Error("Token não encontrado após 'Bearer'");
    }

    // Retorna o token extraído
    return token;
}

// Função para extrair e decodificar o token usando a chave secreta do JWT
function extrairDecoded(token) {
    const SEGREDO_JWT = process.env.DB_SECRET;

    // Verifica se a chave secreta JWT não está definida
    if (!SEGREDO_JWT) {
        console.log("Segredo JWT não definido");
        throw new Error("Configuração inválida do servidor");
    }

    try {
        // Tenta decodificar o token usando a chave secreta
        const decoded = jwt.verify(token, SEGREDO_JWT);
        return decoded;
    } catch (err) {
        // Se ocorrer um erro ao tentar decodificar, exibe a mensagem de erro
        console.log("Erro ao decodificar o token:", err.message);
        throw new Error("Token inválido");
    }
}

// Função que extrai o token do contexto e o decodifica
function extrairObjDecoder(ctx) {
    // Extrai o token do contexto
    const token = extrairTokenContext(ctx);

    // Decodifica o token e retorna o objeto extraído
    const decodedExtraido = extrairDecoded(token);
    return decodedExtraido;
}

// Exportação nomeada das funções
export {
    extrairTokenContext,
    extrairDecoded,
    extrairObjDecoder
};
