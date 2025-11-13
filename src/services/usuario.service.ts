import axios from "axios";

export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  fecha_nac: string;
  rol_id?: number;
}

interface RespuestaUsuarios {
  mensaje: string;
  obtenerUsuarios: Usuario[];
}

const API_URL = "http://localhost:3000/api";

class UsuarioService {
  async obtenerUsuarios(): Promise<Usuario[]> {
    const { data } = await axios.get(`${API_URL}/obtenerUsers`);
    return data.obtenerUsuarios;
  }

}

export default new UsuarioService();
