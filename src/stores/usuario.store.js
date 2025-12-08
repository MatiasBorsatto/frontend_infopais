import { defineStore } from "pinia";
import usuarioService from "../services/usuario.service";
import authService from "../services/auth.service";

export const useUsuarioStore = defineStore(
  "Usuarios",
  () => {
    //Usuarios CRUD
    const obtenerUsuarios = async () => {
      try {
        const usuarios = await usuarioService.obtenerUsuarios();
        return usuarios;
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    const guardarUsuario = async (usuario) => {
      try {
        const guardarUsuario = await authService.registerAdmin(usuario);
        console.log(guardarUsuario);

        return guardarUsuario;
      } catch (error) {
        console.error("Error al guardar usuarios:", error);
        throw error;
      }
    };

    const eliminarUsuario = async (id) => {
      try {
        const eliminarUsuario = await usuarioService.eliminarUsuario(id);
        return eliminarUsuario;
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    };

    //Para poder compartirlas es necesario retornarlas, por ende dentro del ultimo return se indica las funciones / variables que se van a compartir en el resto del codigo

    return {
      obtenerUsuarios,
      guardarUsuario,
      eliminarUsuario,
    };
  },
  {
    persist: true,
  }
);
