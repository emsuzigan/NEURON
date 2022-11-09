import { useState } from 'react';

import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Container, TextField, InputLabel, FormControl, OutlinedInput, Button, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Address } from '../../types/address'
import { ClientService } from '../../services/ClientService';
import { AddressFormGroup } from '../../components/AddressFormGroup';
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
	const [adresses, setAdresses] = useState<Address[]>([]);

	const handleSubmit = (e: any) => {
		const token = localStorage.getItem("authToken")

		const newClient = { ...client, adresses: adresses }

		ClientService.create(newClient, token).then((response) => {
			toast.success("Cliente cadastrado com sucesso!")
			setAdresses([])
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
			<Box component={"form"} sx={{ boxShadow: '0px 0px 0px 2px rgba(0,0,0,.09)', backgroundColor: '#fff', padding: '2rem', borderRadius: '.5rem' }} >
				<Grid container spacing={1}>
					<Grid item xs={12} md={6}>
						<FormControl fullWidth sx={{ m: 1 }}>
							<InputLabel htmlFor="name">Nome</InputLabel>
							<OutlinedInput
								id="name"
								label="Nome"
								value={client.name}
								onChange={(event) => setClient({ ...client, name: event.target.value })}
							/>
						</FormControl>

					</Grid>
					<Grid item xs={12} md={6}>
						<FormControl fullWidth sx={{ m: 1 }}>
							<InputLabel htmlFor="lastName">Sobrenome</InputLabel>
							<OutlinedInput
								id="lastName"
								label="Sobrenome"
								value={client.lastName}
								onChange={(event) => setClient({ ...client, lastName: event.target.value })}
							/>
						</FormControl>
					</Grid>

				</Grid>

				<FormControl fullWidth sx={{ m: 1 }}>
					<InputLabel htmlFor="cpf">CPF</InputLabel>
					<OutlinedInput
						id="cpf"
						label="CPF"
						value={client.cpf}
						onChange={(event) => setClient({ ...client, cpf: event.target.value })}
						inputComponent={CPFMask as any}
					/>
				</FormControl>

				<DatePicker
					label="Data de Nascimento"
					value={client.birthDate}
					inputFormat={'dd/MM/yyyy'}
					onChange={(birthDate: any) => {
						setClient({ ...client, birthDate });
					}}
					renderInput={(params: any) => <TextField id="birthDate" noValidate fullWidth sx={{ m: 1, mt: 1.5 }} {...params} />}
				/>

				<AddressFormGroup adresses={adresses} removeAddress={(id) => {
					const newList = adresses.filter((_, index) => index !== id)
					setAdresses(newList)
				}} addAddress={(address: any) => setAdresses([...adresses, address])} />

				<Box sx={{ m: 1, display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
					<Button sx={{ m: 1 }} size='large' variant="contained" color={'success'} className="btn" type="button" onClick={handleSubmit}>
						Cadastrar Cliente
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
