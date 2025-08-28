import {
  createTaskThunk,
  deleteTaskThunk,
  getTaskThunk,
} from "@/entities/Task/redux/thunk";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useEffect, useState, type JSX } from "react";

const INITIAL_INPUTS_DATA = {
  title: "",
  desc: "",
};
export function TaskPage(): JSX.Element {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const dispatch = useAppDispatch();
  //Добавление задач работа с формой
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(createTaskThunk(inputs));
    setInputs(INITIAL_INPUTS_DATA);
    console.log(`Задача успешно добавлена`, inputs);
  };

  //Получение всех задач
  const { tasks } = useAppSelector((store) => store.taskSlice);
  useEffect(() => {
    dispatch(getTaskThunk());
  }, [dispatch]);

  //удаление задачи
  const deleteHandler = async (id: number): Promise<void> => {
    await dispatch(deleteTaskThunk(id));
    await dispatch(getTaskThunk());
    console.log(`Задача успешно удалена`);
  };

  return (
    <>
      <div>
        <h1>TODO</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="title"
            required
            placeholder="Название задачи"
            value={inputs.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="desc"
            required
            placeholder="Название задачи"
            value={inputs.desc}
            onChange={handleChange}
          />
          <button>Добавить</button>
        </form>
      </div>
      <div>
        {tasks.map((task) => (
          <div key={task.id} style={{ display: "flex" }}>
            <div>{task.title}</div>
            <button onClick={() => deleteHandler(task.id)}>
              Удалить задачу
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
