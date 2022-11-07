import { Button, Container, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ClientService } from "../../services/ClientService";
import { Client } from "../../types/client";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './style.css'
import { useNavigate } from "react-router-dom";
import { CTable } from "../../components/CTable";
import { CDialog } from "../../components/CDialog";

export const Home = () => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [clientSelected, setClientSelected] = useState();

  useEffect(() => {
    fetchClients();
  }, [])

  const closeDialog = (value: boolean) => {
    setDialog(false)
    if (value) {
      const token = localStorage.getItem("authToken")

      ClientService.delete(clientSelected, token)
        .then((response) => {
           fetchClients()
        })
        .catch((error: any) => {
          console.error("Erro ao buscar clientes")
        })
    }
  };



  async function fetchClients() {
    const token = localStorage.getItem("authToken")

    ClientService.list(token)
      .then((response) => {
        setClients(response.data.data);
      })
      .catch((error: any) => {
        console.error("Erro ao buscar clientes")
      })
  }


  function view(id: number) {
    navigate(`/visualizar/${id}`)
  }


  function update(id: number) {
    navigate(`/atualizar/${id}`)
  }

  return (
    <Container style={{ marginTop: "2rem" }}>
      {clientSelected}
      <Box sx={{ marginBottom: '2rem' }}>
        <Button style={{ marginTop: "2rem" }} variant="contained" startIcon={<AddCircleIcon />}>
          Novo
        </Button>
      </Box>
      <Box>
        <CTable remove={(id: any) => {
           setDialog(true)
           setClientSelected(id)
        }} update={update} view={view} clients={clients} />
      </Box>

      <CDialog
        id="remove-client-dialog"
        keepMounted
        open={dialog}
        onClose={closeDialog}
      />
    </Container>
  );
}
