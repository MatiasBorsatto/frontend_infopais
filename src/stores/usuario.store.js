import { defineStore } from "pinia";
import usuarioService from "../services/usuario.service";

export const useUsuarioStore = defineStore("Usuarios", () => {
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
      const guardarUsuario = await authService.register(usuario);
      return guardarUsuario;
    } catch (error) {
      console.error("Error al guardar usuarios:", error);
    }
  };

  //Para poder compartirlas es necesario retornarlas, por ende dentro del ultimo return se indica las funciones / variables que se van a compartir en el resto del codigo

  return {
    obtenerUsuarios,
    guardarUsuario,
  };
});
