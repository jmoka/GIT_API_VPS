// Importando a função extrairDecoded que para decodifica o token
import { extrairDecoded } from "../services/extrairContext.js";

// Exportando uma função assíncrona que recebe o objeto `req` (requisição)
export default async ({ req }) => {
    // Obtendo o cabeçalho de autorização da requisição
    const auth = req.headers.authorization;

    // Inicializando as variáveis para armazenar informações do usuário e se o perfil foi configurado
    let usuario = null;
    let perfilSetado = false;

    // Se houver o cabeçalho de autorização, retiramos o token da parte após o "Bearer "
    const token = auth && auth.substring(7);

    // 1 - Verificar se o token é válido
    if (token) {
        try {
            // Decodificando o token para obter suas informações
            const conteudoToken = extrairDecoded(token);
            let agora = new Date().getTime(); // Obtendo o horário atual
            let validadeToken = conteudoToken.exp * 1000; // O campo 'exp' do token é em segundos, então multiplicamos por 1000 para transformar em milissegundos

            // Verificando se o token ainda é válido (a validade é comparada com a hora atual)
            if (validadeToken > agora) {
                // Se o token for válido, armazenamos as informações do usuário no objeto `usuario`
                usuario = conteudoToken;
            }

        } catch (error) {
            // Caso ocorra um erro na extração do token (por exemplo, se o token for inválido), nada é feito
            // O erro é registrado no console
            console.error("Erro ao extrair token:", error.message);
        }
    }

    return {
        usuario, // Informação do usuário extraída do token, se o token for válido
        perfilSetado, // Indica se o perfil do usuário foi configurado
    };
};
