// src/services/authService.js
import axios from "axios";

interface Login {
  email: string;
  password: string;
}

interface Register {
  fecha_nac?: string;
  nombre:string;
  email: string;
  password: string;
}

const API_URL = "http://localhost:3001/api";


class AuthService {
  async login(usuario: Login) {

    const { data } = await axios.post(`${API_URL}/login`, usuario, { withCredentials: true });
    return data;
  }

  async register(usuario: Register) {

    const { data } = await axios.post(`${API_URL}/register`, usuario);
    return data;
  }

  async logout() {

    const { data } = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    return data;
  }
}

export default new AuthService();
