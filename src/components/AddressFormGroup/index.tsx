import { Button, FormControl, Grid, InputLabel, OutlinedInput } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
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

  const handleSubmit = () => {
    addAddress(address);
    setAddress(initialState)
  };

  const getAddressByCep = async (event: any) => {
    if (address.zipCode.length < 8 || address.zipCode === null) {
      return
    }

    axios.get(`https://viacep.com.br/ws/${address.zipCode}/json/`).then(({ data }) => {
      const { bairro: neighborhood, localidade: city, logradouro: street } = data

      setAddress({
        ...address,
        neighborhood,
        city, street
      })

    }).catch((error) => {
      toast.warn("Não foi possivel encontrar endereço com esse CEP")
    })
  }


  return (
    <div>
      <Grid sx={{ mt: 2 }} container spacing={1}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">CEP</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="CEP"
              defaultValue={""}
              onBlur={getAddressByCep}
              value={address.zipCode}
              onChange={(event) => setAddress({ ...address, zipCode: event.target.value })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={8}>
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

        <Grid item xs={4}>
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

        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Bairro</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Bairro"
              defaultValue={""}
              value={address.neighborhood}
              onChange={(event) => setAddress({ ...address, neighborhood: event.target.value })}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
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




