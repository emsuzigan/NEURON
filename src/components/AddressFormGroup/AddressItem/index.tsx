import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface AddressItemProps {
  id: number;
  rua: string;
  cidade: string;
  bairro: string;
  numero: string;
  cep: string;
  remove: (id: number) => void;
}

export function AddressItem({ id, rua, cidade, bairro, numero, cep, remove }: AddressItemProps) {
  return (
    <Box sx={{ mt: 2, backgroundColor: 'rgba(0,0,0,.04)', p: 2, display: 'flex', justifyContent: 'space-between' }}>
      <Typography sx={{
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        fontSize: "20px",
      }}>{rua + ", " + bairro + ", n° " + numero + " - " + cidade + " - " + cep}</Typography>

      <Button onClick={() => remove(id)} color='error' variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </Box>
  )
};