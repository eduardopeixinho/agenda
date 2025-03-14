import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Button, Typography } from "@mui/material";
import AgendaList from "./components/AgendaList";
import AgendaForm from "./components/AgendaForm";

const App = () => {
  return (
    <Router>
      <Container>
        <Typography variant="h4" gutterBottom>
          Gerenciamento de Eventos
        </Typography>
        <Button variant="contained" component={Link} to="/criar">
          Criar Novo Evento
        </Button>
        <Routes>
          <Route path="/" element={<AgendaList />} />
          <Route path="/criar" element={<AgendaForm />} />
          <Route path="/editar/:id" element={<AgendaForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
