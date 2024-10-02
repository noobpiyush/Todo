import { useState, useEffect, useRef } from "react";
import { Check, Trash2, Circle } from "lucide-react";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const isInitialMount = useRef(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    }
  }, []);

  // Save todos to localStorage when they change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem: TodoItem = {
        id: new Date().getTime().toString(),
        text: newTodo.trim(),
        completed: false,
      };
      setTodos(prevTodos => [...prevTodos, newTodoItem]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>
      
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button 
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {todos.map(todo => (
          <div 
            key={todo.id}
            className={`flex items-center p-3 rounded-lg ${
              todo.completed ? 'bg-gray-100' : 'bg-white'
            } border hover:shadow-md transition-shadow`}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`mr-3 flex-shrink-0 ${
                todo.completed ? 'text-green-500' : 'text-gray-400'
              } hover:text-green-600 transition-colors`}
            >
              {todo.completed ? <Check size={20} /> : <Circle size={20} />}
            </button>
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="ml-2 text-red-400 hover:text-red-600 transition-colors"
              aria-label="Delete todo"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {todos.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          {todos.filter(todo => todo.completed).length} of {todos.length} tasks completed
        </div>
      )}
    </div>
  );
}