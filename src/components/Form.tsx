import { Todo } from "./TODOList";

interface FormProps {
  setTodos:Todo[]
}

export const Form = () => {

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();



        const form = e.target as HTMLFormElement;
        form.reset();
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="todo">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your next task"
        />
      </label>
      <button>
        <span className="visually-hidden">Submit</span>
        <svg>
          <path d="" />
        </svg>
      </button>
    </form>
    )
}