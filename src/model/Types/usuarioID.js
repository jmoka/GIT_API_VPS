import db from "../../database/config.js";
import { format } from "date-fns";

export async function UsuarioID(id) {
    try {
        const usuarioID = await db("usuarios")
            .leftJoin("perfis", "usuarios.perfil", "=", "perfis.id")
            .select(
                "usuarios.id",
                "usuarios.nome",
                "usuarios.email",
                "usuarios.status",
                "usuarios.data_criacao",
                "perfis.nome as perfil_nome",
                "perfis.rotulo as perfil_rotulo"
            )
            .where({ "usuarios.id": id })
            .first();

        if (!usuarioID) {
            throw new Error("Não foi possível retornar nenhum usuário com esse ID");
        }

        const resultado = {
            id: usuarioID.id,
            nome: usuarioID.nome,
            email: usuarioID.email,
            status: usuarioID.status,
            dataCriacao: format(new Date(usuarioID.data_criacao), 'yyyy-MM-dd HH:mm:ss'),
            perfil: {
                nome: usuarioID.perfil_nome || "Perfil não definido",
                rotulo: usuarioID.perfil_rotulo || "Rótulo não definido"
            }
        };

        return resultado;
    } catch (error) {
        console.error("Erro ao buscar usuário:", error.message);
        throw new Error("Não foi possível retornar o usuário com esse ID.");
    }
}

export async function Usuario_ID(id) {
    try {
        const UsuarioSelecionado = await db("usuarios")
            .leftJoin("perfis", "usuarios.perfil", "=", "perfis.id")
            .select(
                "usuarios.id",
                "usuarios.nome",
                "usuarios.email",
                "usuarios.status",
                "usuarios.perfil",
                "perfis.nome as perfil_nome",
                "perfis.rotulo as perfil_rotulo",
                "usuarios.data_criacao"
            )
            .where({ "usuarios.id": id })
            .first();

        if (!UsuarioSelecionado) {
            throw new Error("Não foi possível retornar nenhum usuário com esse ID");
        }

        const usuarioCadastrado = {
            id: UsuarioSelecionado.id,
            nome: UsuarioSelecionado.nome,
            email: UsuarioSelecionado.email,
            status: UsuarioSelecionado.status,
            perfil: {
                id: UsuarioSelecionado.perfil,
                nome: UsuarioSelecionado.perfil_nome,
                rotulo: UsuarioSelecionado.perfil_rotulo
            },
            dataCriacao: UsuarioSelecionado.data_criacao
        };

        return usuarioCadastrado;
    } catch (error) {
        console.error("Erro ao buscar usuário:", error.message);
        throw new Error("Não foi possível retornar o usuário com esse ID.");
    }
}
