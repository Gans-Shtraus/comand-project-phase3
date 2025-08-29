import { logoutUserThunk } from "@/entities/User/redux/thunk";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import type { JSX } from "react";
import { Link } from "react-router";
import s from "../style/style.module.css";

export function NavBar(): JSX.Element {
  const { user } = useAppSelector((store) => store.userReducer);
  const dispatch = useAppDispatch();

  const logoutUser = (): void => {
    dispatch(logoutUserThunk());
  };

  return (
    <div className={s.navbar}>
      {user ? (
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
          <Link to="/tableresult">
            <button>Таблица результатов</button>
          </Link>
          <button onClick={logoutUser}>Выпилиться </button>
        </>
      ) : (
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
