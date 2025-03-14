import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { getEventos, deleteEvento } from "../services/api";

const AgendaList = () => {
  const [eventos, setEventos] = useState([]);

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
          <Button component={Link} to={`/editar/${evento.id}`} variant="contained" color="primary">
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
