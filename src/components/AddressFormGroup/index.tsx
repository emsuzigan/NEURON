import { Button, FormControl, Grid, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { Address } from "../../types/address";
import { AddressItem } from "./AddressItem";

interface AddressFormGroupProps {
  adresses: Address[];
  addAddress: (address: Address) => void;
  removeAddress: (index: number) => void;
}

const initialState: Address = {
  street: '',
  city: '',
  neighborhood: '',
  number: '',
  zipCode: ''
}

export function AddressFormGroup({ adresses, addAddress, removeAddress }: AddressFormGroupProps) {
  const [address, setAddress] = useState<Address>(initialState)

  const addressFieldsIsValid = () => {
    return (address.city === "" || address.street === "" || address.zipCode === "" || address.neighborhood === "")
  }

  const handleSubmit = (e: any) => {
    addAddress(address);
    setAddress(initialState)
  };


  return (
    <div>
      <Grid sx={{ mt: 2 }} container spacing={1}>
        <Grid item md={12} sm={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">CEP</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="CEP"
              defaultValue={""}
              value={address.zipCode }
              onChange={(event) => setAddress({ ...address, zipCode: event.target.value })}
            />
          </FormControl>
        </Grid>
        <Grid item md={8} sm={8}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Rua</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Rua"
              defaultValue={""}
              value={address.street}
              onChange={(event) => setAddress({ ...address, street: event.target.value })}
            />
          </FormControl>
        </Grid>

        <Grid item md={4} sm={4}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Número</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Número"
              defaultValue={""}
              value={address.number}
              onChange={(event) => setAddress({ ...address, number: event.target.value })}
            />
          </FormControl>
        </Grid>

        <Grid item md={6} sm={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Bairro</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Bairro"
              defaultValue={""}
              value={address.neighborhood }
              onChange={(event) => setAddress({ ...address, neighborhood: event.target.value })}
            />
          </FormControl>
        </Grid>

        <Grid item md={6} sm={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Cidade</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Cidade"
              defaultValue={""}
              value={address.city}
              onChange={(event) => setAddress({ ...address, city: event.target.value })}
            />
          </FormControl>
        </Grid>

        <Button disabled={addressFieldsIsValid()} sx={{ m: 2 }} variant="contained" color={'primary'} className="btn" type="button" onClick={handleSubmit}>
          Adicionar Endereço
        </Button>
      </Grid>
      {adresses.map((c: any, id: any) => (
        <AddressItem key={id}
          id={id}
          rua={c.street}
          cidade={c.city}
          bairro={c.neighborhood}
          numero={c.number}
          cep={c.zipCode}
          remove={(id) => removeAddress(id)}
        />
      ))}
    </div>
  )
}




