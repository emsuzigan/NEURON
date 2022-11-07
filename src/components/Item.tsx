import React from "react";

interface FuncProps{
    id:number;
    rua: string;
    cidade: string;
    bairro: string;
    numero: string;
    cep: string;
    remove(id:number):void;
}

const Item :React.FC<FuncProps> = ({ id, rua, cidade, bairro, numero, cep, remove }:FuncProps)  => {
  return(
    <div>
        <input 
            type="text"
            value={rua + ", " + bairro + ", n° " + numero + " - " + cidade + " - " +  cep}
            style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "20px",
              }}
            />
            <button onClick={() => remove(id)}>
                Remover
            </button>
    </div>
  )
};
export default Item;