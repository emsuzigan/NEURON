import React, { useState } from 'react';
import Datetime from 'react-datetime';
import AdressList from '../../components/AdressList';

import {Address} from '../../types/address'

import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';
import "react-datetime/css/react-datetime.css";
import { ClientRequest } from 'http';
import { format } from 'path';
import { ClientService } from '../../services/ClientService';

//import 'react-datepicker/dist/react-datepicker-cssmodules.css';
interface NewAdress {
    name: string,
    lastName: string,
    cpf: string,
    birthDate: string,
    adresses?: Address[];
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() < 9 ? '0': '') + date.getMonth()}-${(date.getDay() < 9 ? '0': '') + date.getDay()}`
  }

export const Cadastro = () => {
    
    //const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState(new Date());
    const [client, setClient ] = useState({name: "",
                                           lastName: "",
                                           cpf: "",
                                           birthDate: "",
                                           adresses: []});
    
    const [list, setList] = useState<Address[]>([]);

    const handleSubmit = (e:any) => {
        const token = localStorage.getItem("authToken")
        console.log(token)
        ClientService.create({ ...client, adresses:list}, token).then((response) => { console.log(response)} )
    };
    
    return (
        <div>
            <div>Cadastro</div>

            <div>
                <form>
                    <div>
                        <label>
                            Nome: <input type="text" name="name" value={client.name} onChange={(event) => setClient({ ...client, name:event.target.value })}/>
                        </label>
                        
                        <label>
                            Sobrenome: <input type="text" name="lastname" value={client.lastName} onChange={(event) => setClient({ ...client, lastName:event.target.value })}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            CPF: <input type="text" name="cpf" value={client.cpf} onChange={(event) => setClient({ ...client, cpf:event.target.value })}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Birthdate: <Datetime dateFormat="YY-MM-DD" timeFormat={false} onChange={(event) => setClient({...client, birthDate:formatDate(new Date(event.toString())) })}/>
                        </label>
                    </div>
                    <div>
                        Endereço(s):
                        <AdressList address={list} addAddress={(address:any) => setList([ ...list, address ]) }/>
                    </div>
                </form>

                <button className="btn" type="button" onClick={handleSubmit}>
                    Add Client
                </button>
            </div>
            
        </div>
    );
}
