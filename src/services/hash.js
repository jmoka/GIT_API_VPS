// Importa o pacote bcrypt para criptografia de senhas
import bcrypt from 'bcrypt';

// Função para criar o hash da senha
export const criarHash = async (senha) => {
    try {
        const saltRounds = 10; // Número de saltos para o bcrypt (quanto maior, mais seguro, mas mais lento)
        // Cria o hash da senha usando o bcrypt com o número de saltos especificado
        const hash = await bcrypt.hash(senha, saltRounds);
        return hash;
    } catch (error) {
        // Caso ocorra algum erro durante a criação do hash, exibe a mensagem de erro
        console.error('Erro ao criar hash:', error);
        throw new Error('Erro ao criar hash da senha.');
    }
};

// Função para autenticar a senha fornecida com o hash armazenado
export const autenticar = async (senha, hash) => {
    try {
        // Compara a senha fornecida com o hash armazenado
        const comparacao = await bcrypt.compare(senha, hash);
        if (comparacao) {
            // Se a comparação for verdadeira, retorna true
            return true;
        } else {
            // Se a comparação for falsa, retorna false
            return false;
        }
    } catch (error) {
        // Caso ocorra algum erro durante a autenticação da senha, exibe a mensagem de erro
        console.error('Erro ao autenticar senha:', error);
        throw new Error('Erro ao autenticar senha.');
    }
};
