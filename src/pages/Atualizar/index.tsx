import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { Box, Container, TextField, InputLabel, FormControl, OutlinedInput, Button, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DateFns from '@date-io/date-fns'

import { Address } from '../../types/address'
import { ClientService } from '../../services/ClientService';
import { AddressFormGroup } from '../../components/AddressFormGroup';
import { CPFMask } from '../../components/CPFMask';


const dateFns = new DateFns()
const initialClientState = {
	name: "",
	lastName: "",
	cpf: "",
	birthDate: "",
	adresses: []
}

export const Atualizar = () => {
	const navigate = useNavigate()
	const { id } = useParams();
	const [client, setClient] = useState(initialClientState);
	const [adresses, setAdresses] = useState<Address[]>([]);

	useEffect(() => {
		fetchClientById(id)
	}, [])

	function fetchClientById(id: any) {
		if (!id) {
			return navigate('/inicio')
		}

		const token = localStorage.getItem("authToken")

		ClientService.getById(id, token).then((response) => {
			const client = response.data.data
			setClient({ ...client, birthDate: dateFns.parse(client.birthDate, 'yyyy-MM-dd') })
			setAdresses(client.adresses)
		})
	}

	const handleSubmit = (e: any) => {
		if (!id) {
			return navigate('/inicio')
		}

		const clientUpdate = {
			...client, adresses: adresses, birthDate: dateFns.formatByString(new Date(client.birthDate), 'yyyy-MM-dd')
		}
		const token = localStorage.getItem("authToken")

		ClientService.update(id, clientUpdate, token)
			.then(() => {
				toast.success("Cliente atualizado com sucesso!")
				navigate('/inicio')
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
				<h1>Atualizar</h1>
				<Button onClick={() => navigate('/inicio')} variant="outlined" startIcon={<ArrowBackIcon />}>
					Voltar
				</Button>
			</Box>

			<Box component="form" sx={{ boxShadow: '0px 0px 0px 2px rgba(0,0,0,.09)', backgroundColor: '#fff', padding: '2rem', borderRadius: '.5rem' }} >
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
						return setClient({
							...client, birthDate
						})
					}}
					renderInput={(params: any) => <TextField fullWidth sx={{ m: 1, mt: 1.5 }} {...params} />}
				/>

				<AddressFormGroup adresses={adresses} removeAddress={(id) => {
					const newList = adresses.filter((_, index) => index !== id)
					setAdresses(newList)
				}} addAddress={(address: any) => setAdresses([...adresses, address])} />

				<Box sx={{ m: 1, display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
					<Button sx={{ m: 1 }} size='large' variant="contained" color={'success'} className="btn" type="button" onClick={handleSubmit}>
						Atualizar Cliente
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
