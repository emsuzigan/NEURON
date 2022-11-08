import { Button, Container, Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { ClientService } from "../../services/ClientService";
import { Client } from "../../types/client";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";
import { CTable } from "../../components/CTable";
import { CDialog } from "../../components/CDialog";
import { toast } from "react-toastify";

export const Home = () => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [clientSelected, setClientSelected] = useState<number | null>();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, [])

  const closeDialog = (value: boolean) => {
    setDialog(false)
    if (value && clientSelected !== null) {
      const token = localStorage.getItem("authToken")

      ClientService.delete(clientSelected, token)
        .then((response) => {
          toast.success("Cliente removido com sucesso!")
          fetchClients()
        })
        .catch((error: any) => {
          toast.success("Não foi possivel remover o cliente")
        })
    }

    setClientSelected(null)
  };



  async function fetchClients() {
    const token = localStorage.getItem("authToken")

    ClientService.list(token)
      .then((response) => {
        isLoading(false)
        setClients(response.data.data);
      })
      .catch((error: any) => {
        toast("Erro interno.");

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
      <Box sx={{ display: 'flex', marginBottom: '2rem', justifyContent: 'flex-end' }}>
        <Button style={{ marginTop: "2rem" }} onClick={() => navigate('/cadastro')} variant="contained" startIcon={<AddCircleIcon />}>
          Novo Cliente
        </Button>
      </Box>
      <Box>
        {loading ? <><Skeleton /><Skeleton /><Skeleton /></> : <CTable remove={(id: any) => {
          setDialog(true)
          setClientSelected(id)
        }} update={update} view={view} clients={clients} />}
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
