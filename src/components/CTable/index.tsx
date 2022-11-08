import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { Client } from '../../types/client';
import { dashOnNull } from '../../utils/dashOnNull';
import { formatDate } from '../../utils/formatDate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Tooltip } from '@mui/material';

type CTableProps = {
  clients: Client[],
  remove: (id: any) => void,
  view: (id: any) => void
  update: (id: any) => void
}

export function CTable({ clients, remove, view, update }: CTableProps) {
  return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Id</TableCell>
          <TableCell align="center">Nome</TableCell>
          <TableCell align="center">CPF</TableCell>
          <TableCell align='center'>Data de Nascimento</TableCell>
          <TableCell align='center'>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {clients.length > 0 ? clients.map((client: Client) => (
          <TableRow
            key={client.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" align="center">{client.id}</TableCell>
            <TableCell align="center">
              {client.name === null && client.lastName === null ? '-' : `${client.name} ${client.lastName}`}
            </TableCell>
            <TableCell align="center">{dashOnNull(client.cpf)}</TableCell>
            <TableCell align="center">{formatDate(client.birthDate)}</TableCell>
            <TableCell align="center">
              <Tooltip title="Remover" placement='left' arrow>
                <IconButton onClick={() => remove(client.id)} color="error" aria-label="remover cliente">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Editar" placement='right' arrow>
                <IconButton onClick={() => update(client.id)} color="warning" aria-label="editar cliente">
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        )) : <TableRow><TableCell colSpan={5} align="center">Nenhum cliente cadastrado</TableCell></TableRow>}


      </TableBody>
    </Table>
  </TableContainer>
}