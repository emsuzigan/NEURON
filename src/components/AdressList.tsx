import React, { useState } from "react";
import Item from "./Item";

interface NewAdress {
  id: number;
  rua: string;
  cidade: string;
  bairro: string;
  numero: string;
  cep: string;
};

const AdressList :React.FC = ()  => {
  
  //const [adress, setAdress   ] = useState<string>("");
  
  const [rua   , setRua   ] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [cep   , setCep   ] = useState<string>("");

  const [list, setList] = useState<NewAdress[]>([]);

  const handleSubmit = (e:any) => {
    const newAdress = {
      id: Math.random(),
      rua:    rua   ,
      cidade: cidade,
      bairro: bairro,
      numero: numero,
      cep:    cep   ,
    };
    if (rua    && rua.length <= 25    ) { setList([...list, newAdress]); setRua(""); }
    if (cidade && cidade.length <= 25 ) { setList([...list, newAdress]); setCidade(""); }
    if (bairro && bairro.length <= 25 ) { setList([...list, newAdress]); setBairro(""); }
    if (numero && numero.length <= 25 ) { setList([...list, newAdress]); setNumero(""); }
    if (cep    && cep.length <= 25    ) { setList([...list, newAdress]); setCep(""); }
    
  };

  const remove = (id:number): void => {
    setList(list.filter((el) => el.id !== id));
  };

  const handleChangeRua    = (e:React.ChangeEvent<HTMLInputElement>) => { setRua   (e.target.value); };
  const handleChangeCidade = (e:React.ChangeEvent<HTMLInputElement>) => { setCidade(e.target.value); };
  const handleChangeBairro = (e:React.ChangeEvent<HTMLInputElement>) => { setBairro(e.target.value); };
  const handleChangeNumero = (e:React.ChangeEvent<HTMLInputElement>) => { setNumero(e.target.value); };
  const handleChangeCep    = (e:React.ChangeEvent<HTMLInputElement>) => { setCep   (e.target.value); };

  return(
    <div>
      <form>
      <input className="input" type="text" value={rua   } placeholder="Enter the items" onChange={handleChangeRua   } />
      <input className="input" type="text" value={cidade} placeholder="Enter the items" onChange={handleChangeCidade} />
      <input className="input" type="text" value={bairro} placeholder="Enter the items" onChange={handleChangeBairro} />
      <input className="input" type="text" value={numero} placeholder="Enter the items" onChange={handleChangeNumero} />
      <input className="input" type="text" value={cep   } placeholder="Enter the items" onChange={handleChangeCep   } />

        <button className="btn" type="button" onClick={handleSubmit}>
          Add Items
        </button>
      </form>
      <div>
        {list.map((c, id) => (
          <Item key={id}
                id={c.id}
                rua={c.rua}
                cidade={c.cidade}
                bairro={c.bairro}
                numero={c.numero}
                cep={c.cep}
                remove={remove}
                />
        ) )}
      </div>
    </div>
  )
}

export default AdressList;





