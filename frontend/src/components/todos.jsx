export function Todos({todos}) {
    
    const markComplete = async (todoId) => {
        const response = await fetch("http://localhost:3000/completed", {
          method: "PATCH",
          body: JSON.stringify({
            id: todoId,
            completed: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
          };
    return <div>
        {todos.map(function(todo){
            return <div key={todo.id}>
                 <h1>{todo.title}</h1>
                 <h2>{todo.description}</h2>
                 <button onClick={() => markComplete(todo._id)}>
                    {todo.completed == true ? "completed" : "Mark as Completed"}</button> 
                    
            </div>
            
        })}
    </div>
}
