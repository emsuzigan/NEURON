import React, { useState } from "react";

import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

interface NewAdress {
  id: number;
  address: string;
};

const AdressList :React.FC = ()  => {
    const { register, control, handleSubmit, reset, trigger, setError } = useForm({
      // defaultValues: {}; you can populate the fields by this attribute 
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: "test"
    });

    const [address, setAddress] = useState<string>("");
    const [list, setList] = useState<NewAdress[]>([]);


    return(
      <div>
        <form>
        {fields.map((item, index) => ( 
          <li key={item.id}>
            Endereço: <input {...register(`test.${index}.address`)}/>
            <button type="button" onClick={() => remove(index)}>Delete</button>
          </li>
          ))}
          <button type="button" onClick={() => append({ address: "" })}>
                adicionar
          </button>
        </form>
      </div>
    )
}

export default AdressList;