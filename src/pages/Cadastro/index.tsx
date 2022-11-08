import { useState } from 'react';

import { Address } from '../../types/address'

import { ClientService } from '../../services/ClientService';
import { Box, Container, TextField, InputLabel, FormControl, OutlinedInput, Button, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AddressFormGroup } from '../../components/AddressFormGroup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { CPFMask } from '../../components/CPFMask';

const initialState = {
	name: "",
	lastName: "",
	cpf: "",
	birthDate: null,
	adresses: []
}

export const Cadastro = () => {
	const navigate = useNavigate()

	const [client, setClient] = useState(initialState);
	const [list, setList] = useState<Address[]>([]);

	const handleSubmit = (e: any) => {
		const token = localStorage.getItem("authToken")
		ClientService.create({ ...client, adresses: list, cpf: client.cpf.replaceAll(".", "").replaceAll("-", "") }, token).then((response) => {
			toast.success("Cliente cadastrado com sucesso!")
			setList([])
			setClient(initialState)
		}).catch((error) => {
			if (error.response.status === 400) {
				return toast.error("Ja existe um Cliente cadastrado com esse CPF")
			}
			return toast.error("Error desconhecido contate o Administrador")
		})
	};

	return (
		<Container sx={{ pb: 5 }}>
			<Box sx={{ mt: 8, mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h1>Cadastro</h1>
				<Button onClick={() => navigate('/inicio')} variant="outlined" startIcon={<ArrowBackIcon />}>
					Voltar
				</Button>
			</Box>
			<form>
				<Box sx={{ boxShadow: '0px 0px 0px 2px rgba(0,0,0,.09)', backgroundColor: '#fff', padding: '2rem', borderRadius: '.5rem' }} >
					<Grid container spacing={1}>
						<Grid item md={6} sm={12}>
							<FormControl fullWidth sx={{ m: 1 }}>
								<InputLabel htmlFor="outlined-adornment-amount">Nome</InputLabel>
								<OutlinedInput
									id="outlined-adornment-amount"
									label="Nome"
									value={client.name}
									onChange={(event) => setClient({ ...client, name: event.target.value })}
								/>
							</FormControl>

						</Grid>
						<Grid item md={6} sm={12}>
							<FormControl fullWidth sx={{ m: 1 }}>
								<InputLabel htmlFor="outlined-adornment-amount">Sobrenome</InputLabel>
								<OutlinedInput
									id="outlined-adornment-amount"
									label="Sobrenome"
									value={client.lastName}
									onChange={(event) => setClient({ ...client, lastName: event.target.value })}
								/>
							</FormControl>
						</Grid>

					</Grid>

					<FormControl fullWidth sx={{ m: 1 }}>
						<InputLabel htmlFor="outlined-adornment-amount">CPF</InputLabel>
						<OutlinedInput
							id="outlined-adornment-amount"
							label="CPF"
							value={client.cpf}
							onChange={(event) => setClient({ ...client, cpf: event.target.value })}
							inputComponent={CPFMask as any}
						/>
					</FormControl>

					<DatePicker

						label="Data Nascimento"
						value={client.birthDate}
						onChange={(birthDate: any) => {
							setClient({ ...client, birthDate });
						}}
						renderInput={(params: any) => <TextField noValidate fullWidth sx={{ m: 1, mt: 1.5 }} {...params} />}
					/>

					<AddressFormGroup adresses={list} removeAddress={(id) => {
						const newList = list.filter((_, index) => index !== id)
						setList(newList)
					}} addAddress={(address: any) => setList([...list, address])} />

					<Box sx={{ m: 1, display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
						<Button sx={{ m: 1 }} size='large' variant="contained" color={'success'} className="btn" type="button" onClick={handleSubmit}>
							Cadastrar Cliente
						</Button>
					</Box>
				</Box>
			</form>
		</Container>
	);
}
