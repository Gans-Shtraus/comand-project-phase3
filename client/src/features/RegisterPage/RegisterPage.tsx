import type { IUser } from "@/entities/User/model";
import { registerUserThunk } from "@/entities/User/redux/thunk";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { useState, type JSX } from "react";
import { useNavigate } from "react-router";

const INITIAL_INPUTS_DATA: IUser = {
  username: "",
  email: "",
  password: "",
};

export function RegisterPage(): JSX.Element {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeHadler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(registerUserThunk(inputs));
    setInputs(INITIAL_INPUTS_DATA);
    navigate("/home");
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="username"
          required
          placeholder="username"
          value={inputs.username}
          onChange={changeHadler}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={inputs.email}
          onChange={changeHadler}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={inputs.password}
          onChange={changeHadler}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
