import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Button, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { getEventos, putEvento, deleteEvento } from "../services/api";

const AgendaList = () => {
  const [eventos, setEventos] = useState([]);

  // Valores possíveis para o status do evento
  const estadosAgenda = ['RECEBIDO', 'CONFIRMADO', 'ATENDIDO', 'CANCELADO'];

  useEffect(() => {
    // Fazendo a requisição para pegar os eventos
    getEventos()
      .then((response) => setEventos(response.data))
      .catch((error) => console.error("Erro ao carregar eventos:", error));
  }, []);

  const handleDelete = (evento_id) => {
    deleteEvento(evento_id)
      .then(() => {
        setEventos(eventos.filter((evento) => evento.id !== evento_id)); // Atualiza a lista após exclusão
      })
      .catch((error) => console.error("Erro ao excluir evento:", error));
  };

  const handleStatusChange = (id, newStatus) => {
    const eventoAtualizado = eventos.find((evento) => evento.id === id);
    eventoAtualizado.estadoAtualAgenda = newStatus;

    putEvento(id, eventoAtualizado)
      .then(() => {
        // Atualiza a lista com o evento atualizado
        setEventos(eventos.map((evento) => (evento.id === id ? eventoAtualizado : evento)));
      })
      .catch((error) => console.error("Erro ao atualizar status do evento:", error));
  };

  if (eventos.length === 0) {
    return (
      <Typography variant="body1" style={{ marginTop: 16 }}>
        Nenhum evento encontrado.
      </Typography>
    );
  }

  return (
    <List>
      {eventos.map((evento) => (
        <ListItem
          key={evento.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          <ListItemText
            primary={evento.titulo}
            secondary={`${evento.descricao} - ${evento.dataInicio} a ${evento.dataFim}`}
          />
          
          {/* Select para alterar o status do evento */}
          <FormControl style={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={evento.estadoAtualAgenda}
              onChange={(e) => handleStatusChange(evento.id, e.target.value)}
              label="Status"
            >
              {estadosAgenda.map((estado) => (
                <MenuItem key={estado} value={estado}>
                  {estado}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button component={Link} to={`/editar/${evento.id}`} variant="contained" color="primary" style={{ marginLeft: 8 }}>
            Editar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(evento.id)}
          >
            Excluir
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default AgendaList;
