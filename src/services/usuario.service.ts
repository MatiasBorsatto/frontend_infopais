import axios from "axios";

export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  fecha_nac?: string;
  rol_id?: number;
}


const API_URL = "http://localhost:3001/api";

//const API_URL = "http://192.168.1.16:3001/api";    En produccion

class UsuarioService {
  async obtenerUsuarios(): Promise<Usuario[]> {
    const { data } = await axios.get(`${API_URL}/obtenerUsers`);
    return data.obtenerUsuarios;
  }

  async obtenerUsuario(id: number): Promise<Usuario[]> {
    const { data } = await axios.get(`${API_URL}/obtenerUser/:${id}`);
    return data;
  }

 async actualizarUsuario(id: number, newData: object) {
    const { data } = await axios.put(`${API_URL}/actualizarUsuario/${id}`, newData);
    return data;
}

async eliminarUsuario(id: number) {
    const { data } = await axios.delete(`${API_URL}/eliminarUsuario/${id}`);
    return data;
}


}

export default new UsuarioService();
