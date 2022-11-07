import React, { useState } from 'react';
import Datetime from 'react-datetime';
import AdressList from '../../components/AdressList';

import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';
import "react-datetime/css/react-datetime.css";
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const Cadastro = () => {
    //const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState(new Date());
    
    return (
        <div>
            <div>Cadastro</div>

            <div>
                <form>
                    <div>
                        <label>
                            Name: <input type="text" name="name" />
                        </label>
                        <label>
                            LastName: <input type="text" name="lastname" />
                        </label>
                    </div>
                    <div>
                        <label>
                            CPF: <input type="text" name="cpf" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Birthdate: <Datetime />
                        </label>
                    </div>
                    <div>
                        Endereço(s):
                        <AdressList/>
                    </div>
                </form>
            </div>
        </div>
    );
}
