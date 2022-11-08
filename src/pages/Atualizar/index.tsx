import { useEffect, useState } from 'react';

import { Address } from '../../types/address'

import { ClientService } from '../../services/ClientService';
import { Box, Container, TextField, InputLabel, FormControl, OutlinedInput, Button, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AddressFormGroup } from '../../components/AddressFormGroup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import DateFns from '@date-io/date-fns'
import { toast } from "react-toastify";

export const Atualizar = () => {
	const dateFns = new DateFns()
	const navigate = useNavigate()
	const { id } = useParams();
	const [client, setClient] = useState({
		name: "",
		lastName: "",
		cpf: "",
		birthDate: "",
		adresses: []
	});
	const [list, setList] = useState<Address[]>([]);


	useEffect(() => {
		fetchClientById(id)
	}, [id])

	function fetchClientById(id: any) {
		if (!id) {
			return navigate('/inicio')
		}

		const token = localStorage.getItem("authToken")

		ClientService.getById(id, token).then((response) => {
			const client = response.data.data
			setClient({ ...client, birthDate: dateFns.parse(client.birthDate, 'yyyy-MM-dd') })
			setList(client.adresses)
		})
	}

	const handleSubmit = (e: any) => {
		if (!id) {
			return navigate('/inicio')
		}

		const token = localStorage.getItem("authToken")
		ClientService.update(id, { ...client, adresses: list, birthDate: dateFns.formatByString(new Date(client.birthDate), 'yyyy-MM-dd') }, token)
			.then((response) => {
				toast.success("Cliente atualizado com sucesso!")
				navigate('/inicio')
			}).catch((error) => {
				toast.error("Erro ao tentar atualizar Cliente")
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
					/>
				</FormControl>

				<DatePicker
					label="Data Nascimento"
					value={client.birthDate}
					inputFormat={'dd/MM/yyyy'}
					onChange={(birthDate: any) => {
						return setClient({
							...client, birthDate
						})
					}}
					renderInput={(params: any) => <TextField fullWidth sx={{ m: 1, mt: 1.5 }} {...params} />}
				/>

				<AddressFormGroup adresses={list} removeAddress={(id) => {
					const newList = list.filter((_, index) => index !== id)
					setList(newList)
				}} addAddress={(address: any) => setList([...list, address])} />

				<Box sx={{ m: 1, display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
					<Button sx={{ m: 1 }} size='large' variant="contained" color={'success'} className="btn" type="button" onClick={handleSubmit}>
						Atualizar Cliente
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
