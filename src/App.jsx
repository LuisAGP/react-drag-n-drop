import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { useEffect, useState } from "react"

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
  {id: 1, text: "Aprender React"},
  {id: 2, text: "Aprender Django"},
  {id: 3, text: "Crear Api"},
  {id: 4, text: "Crear Ecommerce"},
  {id: 5, text: "Aprender Docker"},
  {id: 6, text: "Deploy a proyecto"},
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

  const handlerDragEnd = (result) => {
    if(!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const copyTodos = [...todos];
    const [reorderItem] = copyTodos.splice(startIndex, 1);

    copyTodos.splice(endIndex, 0, reorderItem);

    setTodos(copyTodos);

  }

  return <>
    <DragDropContext onDragEnd={handlerDragEnd}>
      <h1>Hola</h1>
      <Droppable droppableId="todos">
        {
          (droppableProvider) => (
            <ul ref={droppableProvider.innerRef} {...droppableProvider.droppableProps}>
              {
                todos.map((todo, index) => (
                  <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                    {
                      (draggableProvider) => (
                        <li 
                          ref={draggableProvider.innerRef}
                          {...draggableProvider.dragHandleProps}
                          {...draggableProvider.draggableProps}
                        >{todo.text}</li>
                      )
                    }
                  </Draggable>
                ))
              }
              {droppableProvider.placeholder}
            </ul>
          )
        }
      </Droppable>
    </DragDropContext>
  </>
}

export default App;