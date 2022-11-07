import React, { useState } from "react";
import { Address } from "../types/address";
import Item from "./Item";

interface AddressListProps {
  address: Address[];
  addAddress: (address: Address) => void;

}

const AdressList :React.FC<AddressListProps> = ({address, addAddress}:AddressListProps)  => {
  
  //const [adress, setAdress   ] = useState<string>("");
  
  const [street      , setStreet      ] = useState<string>("");
  const [city        , setCity        ] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [number      , setNumber      ] = useState<string>("");
  const [zipCode     , setZipCode     ] = useState<string>("");

  //const [list, setList] = useState<NewAdress[]>([]);

  const handleSubmit = (e:any) => {
    const newAdress = {
      street:       street      ,
      city:         city        ,
      neighborhood: neighborhood,
      number:       number      ,
      zipCode:      zipCode     
    };
    if (setStreet       && setStreet.length <= 25 )       { addAddress( newAdress ); setStreet      (""); }
    if (setCity         && setCity.length <= 25 )         { addAddress( newAdress ); setCity        (""); }
    if (setNeighborhood && setNeighborhood.length <= 25 ) { addAddress( newAdress ); setNeighborhood(""); }
    if (setNumber       && setNumber.length <= 25 )       { addAddress( newAdress ); setNumber      (""); }
    if (setZipCode      && setZipCode.length <= 25    )   { addAddress( newAdress ); setZipCode     (""); }
    
  };

  const remove = (id:number): void => {
    //addAddress(address.filter((el:any) => el.id !== id));
  };

  const handleChangeRua    = (e:React.ChangeEvent<HTMLInputElement>) => { setStreet      (e.target.value); };
  const handleChangeCidade = (e:React.ChangeEvent<HTMLInputElement>) => { setCity        (e.target.value); };
  const handleChangeBairro = (e:React.ChangeEvent<HTMLInputElement>) => { setNeighborhood(e.target.value); };
  const handleChangeNumero = (e:React.ChangeEvent<HTMLInputElement>) => { setNumber      (e.target.value); };
  const handleChangeCep    = (e:React.ChangeEvent<HTMLInputElement>) => { setZipCode     (e.target.value); };

  return(
    <div>
      <form>
      <input className="input" type="text" value={street       } placeholder="Enter the items" onChange={handleChangeRua   } />
      <input className="input" type="text" value={city         } placeholder="Enter the items" onChange={handleChangeCidade} />
      <input className="input" type="text" value={neighborhood } placeholder="Enter the items" onChange={handleChangeBairro} />
      <input className="input" type="text" value={number       } placeholder="Enter the items" onChange={handleChangeNumero} />
      <input className="input" type="text" value={zipCode      } placeholder="Enter the items" onChange={handleChangeCep   } />

        <button className="btn" type="button" onClick={handleSubmit}>
          Add Items
        </button>
      </form>
      <div>
        {address.map((c:any, id:any) => (
          <Item key={id}
                id={c.id}
                rua={c.street}
                cidade={c.city}
                bairro={c.neighborhood}
                numero={c.number}
                cep={c.zipCode}
                remove={remove}
                />
        ) )}
      </div>
    </div>
  )
}

export default AdressList;





