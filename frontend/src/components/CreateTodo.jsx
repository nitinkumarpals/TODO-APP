import { useState } from "react";

export function CreateTodo(){

    const[title, setTitle] = useState("");
    const[description,setDescription] = useState("");
    const addTodo = async () => {
        try {
          const response = await fetch("http://localhost:3000/todo", {
            method: "post",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const json = await response.json();
          console.log(json);
        } catch (error) {
          console.error("Error adding todo:", error);
        }
      };
    return <div>
        <input style={{
            padding: 5,
            margin: 10
        }} type="text" placeholder="title" onChange={(e) => {
          const value = e.target.value;
          setTitle(value);
        }
        } /><br /><br />
        <input style={{
            padding: 5,
            margin: 10
        }} type="text" placeholder="description" onChange={(e) => {
            const value = e.target.value;
            setDescription(value);
        } }/><br /><br />

        <button style={{
            padding: 5,
            margin: 10
        }} onClick={addTodo} >Add a todo</button>
    </div>
}