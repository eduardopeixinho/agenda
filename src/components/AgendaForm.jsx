import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { postEvento, getEventoById, putEvento } from "../services/api";

const AgendaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState({
    titulo: "",
    descricao: "",
    dataInicio: "",
    dataFim: "",
    estadoAtualAgenda: "",
    local: ""
  });

  // Valores permitidos para o estado da agenda
  const estadosAgenda = [
    "RECEBIDO",
    "CONFIRMADO",
    "ATENDIDO",
    "CANCELADO"    
  ];

  // Função para formatar a data para o formato esperado (YYYY-MM-DD HH:mm)
  const formatDate = (date) => {
    if (!date) return ""; // Verifica se a data é válida (não nula ou indefinida)

    const d = new Date(date);

    // Verifica se a data é inválida
    if (isNaN(d.getTime())) return "";

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`; // Formato YYYY-MM-DD HH:mm
  };

  // Carregar evento para edição se um `id` estiver presente
  useEffect(() => {
    if (id) {
      getEventoById(id)
        .then((response) => {
          const { data } = response;
          setEvento({
            titulo: data.titulo,
            descricao: data.descricao,
            dataInicio: formatDate(data.dataInicio),
            dataFim: formatDate(data.dataFim),
            estadoAtualAgenda: data.estadoAtualAgenda,
            local: data.local
          });
        })
        .catch((error) => console.error("Erro ao buscar evento:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Formatar as datas para o formato esperado (YYYY-MM-DD HH:mm)
    const formattedDataInicio = evento.dataInicio ? formatDate(evento.dataInicio) : "";
    const formattedDataFim = evento.dataFim ? formatDate(evento.dataFim) : "";

    const eventoData = {
      ...evento,
      dataInicio: formattedDataInicio,
      dataFim: formattedDataFim
    };

    if (id) {
      // Atualiza evento
      putEvento(id, eventoData)
        .then(() => navigate("/"))
        .catch((error) => console.error("Erro ao atualizar evento:", error));
    } else {
      // Cria novo evento
      postEvento(eventoData)
        .then(() => navigate("/"))
        .catch((error) => console.error("Erro ao criar evento:", error));
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          name="titulo"
          label="Título"
          value={evento.titulo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="descricao"
          label="Descrição"
          value={evento.descricao}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="dataInicio"
          label="Data de Início"
          type="datetime-local"
          value={evento.dataInicio ? evento.dataInicio.slice(0, 16) : ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="dataFim"
          label="Data de Fim"
          type="datetime-local"
          value={evento.dataFim ? evento.dataFim.slice(0, 16) : ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Campo para selecionar o estado atual da agenda */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Estado Atual</InputLabel>
          <Select
            name="estadoAtualAgenda"
            value={evento.estadoAtualAgenda}
            onChange={handleChange}
            label="Estado Atual"
          >
            {estadosAgenda.map((estado) => (
              <MenuItem key={estado} value={estado}>
                {estado}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="local"
          label="Local"
          value={evento.local}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? "Editar" : "Criar"} Evento
        </Button>
      </form>
    </Container>
  );
};

export default AgendaForm;
