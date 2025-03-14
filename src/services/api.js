import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000"  // Ajuste conforme o URL da sua API
});

// Funções para acessar a API
export const getEventos = () => api.get("/eventos");
export const postEvento = (evento) => api.post("/eventos", evento);
export const putEventoStatus = (evento_id, status) => api.put(`/eventos/status/${evento_id}`, { status });
export const deleteEvento = (evento_id) => api.delete(`/eventos/${evento_id}`);
export const getEventoById = (evento_id) => api.get(`/eventos/${evento_id}`);
export const putEvento = (evento_id, evento) => api.put(`/eventos/${evento_id}`, evento);

export default api;
