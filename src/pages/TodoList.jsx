import { useState } from "react";
import { useAddTodoMutation, useDeleteTodoMutation, useEditCompletedMutation, useGetTodosQuery } from "../redux/apiSlice";
import {  Trash2Icon } from "lucide-react";
import { ToastContainer,toast } from "react-toastify";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const { data: todos, isLoading, isError } = useGetTodosQuery();
  console.log(todos)
  const [addTodo, {isLoading: isAddTodosLoading,isSuccess: isAddTodosSuccess}] = useAddTodoMutation()
  const [deleteTodo, {isLoading: isDeleteTodoLoading, originalArgs: deletingTodoId}] = useDeleteTodoMutation()
  const [editCompleted, {isLoading: isEditCompletedLoading}] = useEditCompletedMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await addTodo({
      text: newTodo,
      from: "10.24.2003",
      to: "10.24.2003",
      isCompleted: false,
      userId: 4
    })
    setNewTodo("");
    toast.success("Todo added successfully",{
      position: "bottom-right",
      autoClose: 1500
    }) 
  };



  const handleDelete = async (id) => {
   await deleteTodo(id)
    toast.error("Todo deleted successfully",{
      position: "bottom-right",
      autoClose: 1500
    }) 
  };

  const handleToggle = async (todo) => {
    await editCompleted({
        id: todo.id,
        isCompleted: !todo.isCompleted,
    });
    if(!todo.isCompleted){
      toast.success("Todo completed successfully",{
        position: "bottom-right",
        autoClose: 1500
      }) 
    } else {
      toast.warning("Todo uncompleted successfully",{
        position: "bottom-right",
        autoClose: 1500
      }) 
    }

};


const startEditing = (todo) => {
  setEditingTodo(todo.id);
  setEditText(todo.text);
};


const handleEdit = async (id) => {
  if (!editText.trim()) {
    toast.error("Todo text cannot be empty", {
      position: "bottom-right",
      autoClose: 1500,
    });
    return;
  }


    await editCompleted({
      id,
      text: editText,
    });

    toast.success("Todo updated successfully", {
      position: "bottom-right",
      autoClose: 1500,
    });
    setEditingTodo(null);
 
};


  if (isLoading) return <div className='text-center'><span className="loading loading-bars loading-lg"/></div>;
  if (isError)
    return <div className='text-center text-error'>Error loading todos</div>;

  return (
    <div className='max-w-xl mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center mb-8'>Todo List</h1>

      <form onSubmit={handleSubmit} className='flex gap-2 mb-8'>
        <input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Add new todo'
          className='input input-bordered flex-1'
        />
        <button type='submit' className='btn btn-primary'>
          {isAddTodosLoading ? <span className="loading loading-dots loading-md"/>: "Add"}
        </button>
      </form>

      <ul className='space-y-4'>
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className='flex items-center gap-4 bg-base-200 p-4 rounded-lg'
          >
            <input
              type='checkbox'
              checked={todo.isCompleted}
              onChange={() => handleToggle(todo)}
              className='checkbox'
            />

            {editingTodo === todo.id ? (
              <div className='flex-1 flex gap-2 items-center'>
                <input
                  type='text'
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className='input input-bordered flex-1'
                />
                <button
                  onClick={() => handleEdit(todo.id)}
                  className='btn btn-success btn-sm'
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTodo(null)}
                  className='btn btn-active btn-sm'
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    todo.isCompleted ? "line-through text-base-content/70" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => startEditing(todo)}
                  className='btn btn-active btn-sm'
                >
                  Edit
                </button>
              </>
            )}

            <button
              onClick={() => handleDelete(todo.id)}
              className='btn btn-error btn-sm'
            >
              {isDeleteTodoLoading && deletingTodoId === todo.id ? <span className="loading loading-spinner text-warning" />:<Trash2Icon/>} 
            </button>
          </li>
        ))}
      </ul>


      <ToastContainer/>
    </div>
  );
};

export default TodoList;
