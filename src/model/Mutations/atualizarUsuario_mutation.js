import db from "../../database/config.js";  // Módulo de banco de dados para realizar operações no banco

// Função para alterar as informações de um usuário
const alterarUsuario = async (user, filtro) => {
    const { id } = filtro;  // Desestruturação do filtro para pegar o ID do usuário que será atualizado.
    console.log("filtro ID: " + id);  // Imprime o ID do filtro para depuração.

    // Objeto com os dados que serão atualizados
    const atualizacoes = {
        nome: user.nome,  // Nome do usuário que será atualizado
        email: user.email,  // E-mail do usuário que será atualizado
        perfil: user.perfil,  // Perfil do usuário que será atualizado
        status: user.status,  // Status do usuário (ativo/inativo) que será atualizado
    };

    try {
        // Verifica se o ID foi fornecido no filtro
        if (id) {
            // Atualiza o usuário na tabela `usuarios` com os novos dados fornecidos
            await db("usuarios")
                .where({ id })
                .update(atualizacoes);

            // Após a atualização, busca o usuário atualizado no banco de dados
            let usuarioEncontrado = await db("usuarios")
                .where({ id }).first();

            // Se o usuário não for encontrado após a atualização, lança um erro
            if (!usuarioEncontrado) {
                throw new Error("Usuário não encontrado.");
            }

            // Após encontrar o usuário, busca o perfil atualizado do usuário
            const perfil = await db("perfis").where({ id: usuarioEncontrado.perfil }).first();

            // Cria um objeto com os dados do usuário atualizado e o perfil
            const retorno = {
                id: usuarioEncontrado.id,  // ID do usuário atualizado
                nome: usuarioEncontrado.nome,  // Nome do usuário atualizado
                email: usuarioEncontrado.email,  // E-mail do usuário atualizado
                status: usuarioEncontrado.status,  // Status do usuário atualizado
                dataCriacao: usuarioEncontrado.data_criacao,  // Data de criação do usuário
                perfil: {
                    id: perfil.id,  // ID do perfil do usuário atualizado
                    nome: perfil.nome,  // Nome do perfil do usuário atualizado
                    rotulo: perfil.rotulo  // Rótulo do perfil do usuário atualizado
                }
            };

            // Imprime no console que o usuário foi atualizado com sucesso
            console.log(`Usuário com ID: ${retorno.id} atualizado com sucesso!`);

            // Imprime no console que a tabela `usuarioPerfis` foi atualizada
            console.log(`Tabela usuarioPerfis atualizada para o usuário com ID: ${id} e perfil ID: ${user.perfil}`);

            // Retorna os dados atualizados do usuário e seu perfil
            return retorno;
        } else {
            // Se o ID não for fornecido, lança um erro indicando que não há critério válido
            throw new Error("Nenhum critério válido foi fornecido para atualizar o usuário.");
        }
    } catch (error) {
        // Em caso de erro durante o processo de atualização, lança um erro com a mensagem correspondente
        throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
};

// Exportação nomeada da função
export { alterarUsuario };
