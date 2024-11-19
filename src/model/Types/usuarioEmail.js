import db from "../../database/config.js";
import { format } from "date-fns";

// Função para buscar usuário por email
export async function UsuarioEmail(email) {
    try {
        const usuarioEmail = await db("usuarios")
            .leftJoin("perfis", "usuarios.perfil", "=", "perfis.id")
            .select(
                "usuarios.id",
                "usuarios.nome",
                "usuarios.email",
                "usuarios.senha",
                "usuarios.status",
                "usuarios.data_criacao",
                "perfis.nome as perfil_nome",
                "perfis.rotulo as perfil_rotulo"
            )
            .where({ "usuarios.email": email })
            .first();

        const resultado = {
            id: usuarioEmail.id,
            nome: usuarioEmail.nome,
            email: usuarioEmail.email,
            senha: usuarioEmail.senha,
            status: usuarioEmail.status,
            dataCriacao: format(new Date(usuarioEmail.data_criacao), 'yyyy-MM-dd HH:mm:ss'),
            perfil: {
                nome: usuarioEmail.perfil_nome,
                rotulo: usuarioEmail.perfil_rotulo
            }
        };

        return resultado;
    } catch (error) {
        console.error("Usuario com email informado não está cadastrado!!");
        throw new Error("Usuario com email informado não está cadastrado!!");
    }
}
