

import { Agent } from "http";
import React from "react";
import { useState } from "react";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>,name: string, age : number) => void; //e: React.FormEvent<HTMLFormElement>
};

const Form = (props: Props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);

  const submit = (e: React.FormEvent<HTMLFormElement>) => { //e:: React.MouseEvent<HTMLFormElement, MouseEvent>
    e.preventDefault();
    props.onSubmit(e,name,age);
    let temporary= +(e)
  };

  
  return (
    <form style={{ display: "flex", flexDirection: "column" }} onSubmit={submit}>
      <label>Name: </label>
      <input
        type={"text"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>Age: </label>
      <input
        type={"age"}
        style={{ marginBottom: 20 }}
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      ></input>
      <button type={"submit"}>Post</button>
    </form>
  );
};

export default Form;
