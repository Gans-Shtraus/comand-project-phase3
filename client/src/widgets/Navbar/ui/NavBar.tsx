import { logoutUserThunk } from "@/entities/User/redux/thunk";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import type { JSX } from "react";
import { Link } from "react-router";

export function NavBar(): JSX.Element {
  const { user } = useAppSelector((store) => store.userReducer);
  const dispatch = useAppDispatch();

  const logoutUser = (): void => {
    dispatch(logoutUserThunk());
  };

  return (
    <div>
      {user ? (
        // Если пользователь есть, показываем username, Home и выход
        <>
          <span>{user.username}</span>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/task">
            <button>Todoшка</button>
          </Link>
          <Link to="/theme">
            <button>Темы</button>
          </Link>
          <button onClick={logoutUser}>Выход</button>
        </>
      ) : (
        // Если пользователя нет, показываем Войти и Зарегистрироваться
        <>
          <Link to="/login">
            <button>Войти</button>
          </Link>
          <Link to="/register">
            <button>Зарегистрироваться</button>
          </Link>
        </>
      )}
    </div>
  );
}
