import { criarHash } from "../../services/hash.js";

/**
 * Função para inserir dados iniciais na tabela 'usuarios'
 * @param { import("knex").Knex } knex - A instância do knex
 * @returns { Promise<void> } - Função assíncrona que retorna uma promise
 */
export const seed = async (knex) => {
    try {
        // Limpa a tabela 'usuarios' antes de inserir os dados iniciais
        await knex('usuarios').del();

        // Cria o hash das senhas para os perfis (usuários) iniciais
        const admin = await criarHash("Admin@123"); // Senha do Admin
        const master = await criarHash("Master@123"); // Senha do Master
        const dev = await criarHash("Dev@123"); // Senha do Developer
        const user = await criarHash("User@123"); // Senha do Usuario
       
        

        // Insere os usuários na tabela 'usuarios'
        await knex('usuarios').insert([
            {
                nome: "UserMaster",
                email: 'master@jotaempresa.com',
                senha: master, // Senha do Master já criptografada
                perfil: 1, // Perfil Master
                status: "ATIVO" // Status do usuário
            },
            {
                nome: "UserDev",
                email: 'dev@jotaempresas.com',
                senha: dev, // Senha do Developer já criptografada
                perfil: 2, // Perfil Developer
                status: "ATIVO" // Status do usuário
            },
            {
                nome: "UserAdmin",
                email: "admin@jotaempresas.com",
                senha: admin, // Senha do Admin já criptografada
                perfil: 3, // Perfil Admin
                status: "ATIVO" // Status do usuário
            },
            {
                nome: "User",
                email: "user@jotaempresas.com",
                senha: user, // Senha do Admin já criptografada
                perfil: 4, // Perfil Usuario
                status: "ATIVO" // Status do usuário
            },
        ]);

        console.log("Usuários inseridos com sucesso!");

    } catch (error) {
        console.error("Erro ao inserir dados iniciais na tabela 'usuarios':", error);
    }
};
